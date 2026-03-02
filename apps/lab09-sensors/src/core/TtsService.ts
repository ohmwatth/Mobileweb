import { TextToSpeech } from "@capacitor-community/text-to-speech";

export class TtsService {
  async speak(text: string) {
    await TextToSpeech.speak({
      text,
      lang: "th-TH",
      rate: 0.9,     
      pitch: 1.1,   
      volume: 1.0,
    });
  }

  async stop() {
    await TextToSpeech.stop();
  }
}