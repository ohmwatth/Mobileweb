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

            <!-- <ExploreContainer name="Tab 2 page" /> -->
            <div class="ion-padding">
                <p>โดย นายวัฒนชัย บึงจันทร์ 663380232-2</p>
            </div>

            <ion-grid>
                <ion-row>
                    <ion-col size="6" :key="photo" v-for="photo in photos">
                        <ion-img :src="photo.webviewPath"></ion-img>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <ion-fab-button @click="takePhoto()">
                    <ion-icon :icon="camera"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
} from "@ionic/vue";
import { camera } from "ionicons/icons";

import { usePhotoGallery } from "@/composables/usePhotoGallery";

const { photos, takePhoto } = usePhotoGallery();
</script>