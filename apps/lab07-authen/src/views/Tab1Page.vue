<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-card v-if="user" class="profile-card">

        <!-- Avatar -->
        <div class="avatar-wrapper">
          <ion-avatar>
            <img
              :src="user.photoUrl || defaultAvatar"
              alt="Profile"
            />
          </ion-avatar>
        </div>

        <ion-card-header>
          <ion-card-title class="name">
            {{ user.displayName || 'No Name' }}
          </ion-card-title>
          <ion-card-subtitle>
            {{ user.email || 'No Email' }}
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>

          <ion-list>
            <ion-item>
              <ion-icon name="mail-outline" slot="start" />
              <ion-label>
                <h3>Email</h3>
                <p>{{ user.email || '-' }}</p>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-icon name="call-outline" slot="start" />
              <ion-label>
                <h3>Phone</h3>
                <p>{{ user.phoneNumber || '-' }}</p>
              </ion-label>
            </ion-item>
          </ion-list>

          <ion-button expand="block" color="danger" @click="logout">
            Logout
          </ion-button>

        </ion-card-content>
      </ion-card>

      <ion-text v-else color="medium">
        <p class="ion-text-center">No user data</p>
      </ion-text>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonText,
} from '@ionic/vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/auth/auth-service'
import type { AuthUser } from '@/auth/auth-interface'

const router = useRouter()
const user = ref<AuthUser | null>(null)

const defaultAvatar =
  'https://ionicframework.com/docs/img/demos/avatar.svg'

onMounted(async () => {
  user.value = await authService.getCurrentUser()
})

async function logout() {
  await authService.logout()
  router.replace('/login')
}
</script>

<style scoped>
.profile-card {
  max-width: 420px;
  margin: auto;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

ion-avatar {
  width: 120px;
  height: 120px;
}

.name {
  text-align: center;
  font-weight: bold;
}
</style>