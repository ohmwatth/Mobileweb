<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title class="ion-text-center">
          💪 Arm Workout App
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Counter Card -->
      <ion-card class="counter-card">
        <ion-card-content class="ion-text-center">
          <div class="rep-number">
            {{ state?.repDisplay ?? 0 }}
          </div>
          <div class="status">
            {{ state?.status }}
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Stats Card -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>📊 สถิติ</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>รอบทั้งหมด</ion-col>
              <ion-col class="ion-text-end">{{ state?.stats.repsTotal ?? 0 }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>รอบถูก</ion-col>
              <ion-col class="ion-text-end text-success">
                {{ state?.stats.repsOk ?? 0 }}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>รอบผิด</ion-col>
              <ion-col class="ion-text-end text-danger">
                {{ state?.stats.repsBad ?? 0 }}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>คะแนน</ion-col>
              <ion-col class="ion-text-end">
                ⭐ {{ state?.stats.score ?? 0 }}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Tempo เฉลี่ย</ion-col>
              <ion-col class="ion-text-end">
                {{ state?.stats.avgRepMs ?? 0 }} ms
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <!-- Message -->
      <ion-card v-if="state?.stats.lastMessage">
        <ion-card-content class="ion-text-center message">
          {{ state?.stats.lastMessage }}
        </ion-card-content>
      </ion-card>

      <!-- Buttons -->
      <ion-grid class="ion-margin-top">
        <ion-row>
          <ion-col>
            <ion-button
              expand="block"
              size="large"
              color="success"
              :disabled="state?.status === 'RUNNING'"
              @click="start"
            >
              ▶ Start
            </ion-button>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-button
              expand="block"
              size="large"
              color="medium"
              :disabled="state?.status !== 'RUNNING'"
              @click="stop"
            >
              ⏹ Stop
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>

    <ion-footer class="ion-padding ion-text-center footer">
      663380232-2 วัฒนชัย บึงจันทร์
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter
} from '@ionic/vue'
import { ref, onMounted, onUnmounted } from "vue";
import { MotionService } from "../core/MotionService";
import { TtsService } from "../core/TtsService";
import { HapticsService } from "../core/HapticsService";
import { ArmWorkoutEngine } from "../core/ArmWorkoutEngine";
import type { WorkoutState } from "../core/types";

const state = ref<WorkoutState | null>(null);

const engine = new ArmWorkoutEngine();
const motion = new MotionService();
const tts = new TtsService();
const haptic = new HapticsService();

let unsubscribe: (() => void) | null = null;

onMounted(() => {
  unsubscribe = engine.onChange(async (s) => {
    state.value = s;

    if (!s.stats.lastMessage) return;

    if (s.stats.lastMessage === "ดีมาก!") {
      await tts.speak(String(s.repDisplay));
      await haptic.success();
    } else {
      await tts.speak(s.stats.lastMessage);
      await haptic.warning();
    }
  });
});

onUnmounted(async () => {
  await motion.stop();
  unsubscribe?.();
});

async function start() {
  await tts.speak("เริ่มกายบริหารแขน ยกขึ้นจนสุดแล้วลดลง");
  engine.start();
  await motion.start((s) => engine.process(s));
}

async function stop() {
  await motion.stop();
  engine.stop();
}
</script>

<style scoped>
.counter-card {
  margin-top: 20px;
  border-radius: 20px;
}

.rep-number {
  font-size: 72px;
  font-weight: bold;
  color: var(--ion-color-primary);
}

.status {
  margin-top: 8px;
  font-size: 14px;
  opacity: 0.7;
}

.text-success {
  color: var(--ion-color-success);
}

.text-danger {
  color: var(--ion-color-danger);
}

.message {
  font-size: 18px;
  font-weight: 500;
}

.footer {
  font-size: 14px;
  opacity: 0.7;
}
</style>