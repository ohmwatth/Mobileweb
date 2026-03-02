import { TextToSpeech } from "@capacitor-community/text-to-speech";

export class TtsService {
  async speak(text: string) {
    await TextToSpeech.speak({
      text,
      lang: "th-TH",
      rate: 0.9,      // ช้าลงนิด
      pitch: 1.1,     // เสียงสูงขึ้นนิด
      volume: 1.0,
    });
  }

  async stop() {
    await TextToSpeech.stop();
  }
}