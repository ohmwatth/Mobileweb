<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

      <div style="text-align:center; margin-top:16px;">
        <h2>Photo Gallery</h2>
        <p>รหัสนักศึกษา: 663380232-2</p>
        <p>ชื่อ-นามสกุล: วัฒนชัย บึงจันทร์</p>
      </div>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <!-- CHANGE: Add a click event listener to the floating action button. -->
        <ion-fab-button @click="addNewToGallery()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <!-- CHANGE: Remove or comment out <ExploreContainer /> -->
      <!-- <ExploreContainer name="Tab 2 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { camera } from 'ionicons/icons';
import { IonPage, IonHeader, IonFab, IonFabButton, IonIcon, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

// CHANGE: Add `usePhotoGallery` import
import { usePhotoGallery } from '@/composables/usePhotoGallery';

// CHANGE: Destructure `addNewToGallery` from `usePhotoGallery()
const { addNewToGallery } = usePhotoGallery();
</script>
