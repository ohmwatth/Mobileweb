import { ref, onMounted, watch } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";

export interface UserPhoto {
  filePath: string;
  webviewPath?: string;
}

export const usePhotoGallery = () => {
  const photos = ref<UserPhoto[]>([]);
  const PHOTO_STORAGE = "photos";

  const loadSaved = async () => {
    const photoList = await Preferences.get({ key: PHOTO_STORAGE });
    const photoInPreferences = photoList.value
      ? JSON.parse(photoList.value)
      : [];

    for (const photo of photoInPreferences) {
      const file = await Filesystem.readFile({
        path: photo.filePath,
        directory: Directory.Data,
      });

      photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
    }
    photos.value = photoInPreferences;
  };

  const savePicture = async (
    photo: Photo,
    fileName: string,
  ): Promise<UserPhoto> => {
    const base64Data = await readAsBase64(photo);
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      filePath: fileName,
      webviewPath: photo.webPath,
    };
  };

  const readAsBase64 = async (photo: Photo) => {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return (await convertBlobToBase64(blob)) as string;
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = new Date().getTime() + ".jpeg";
    const saveFileImage = await savePicture(photo, fileName);

    photos.value = [saveFileImage, ...photos.value];
  };

  watch(photos, (newPhoto) => {
    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(newPhoto),
    });
  });

  onMounted(loadSaved);

  return {
    photos,
    takePhoto,
  };
};