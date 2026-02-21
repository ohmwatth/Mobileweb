import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import type { Base64Image, ImageAnalysisResult } from "./ai.interface";
import { imageAnalysisSchema } from "./ai.interface";
import { app } from "./firebase";

const ai = getAI(app, { backend: new GoogleAIBackend() });

const model = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: imageAnalysisSchema,
  },
});

export class GeminiVisionService {
  static async analyze(image: Base64Image): Promise<ImageAnalysisResult> {
    const prompt =
      "วิเคราะห์ภาพนี้และตอบเป็น JSON ตาม schema เท่านั้น";

    const imagePart = {
      inlineData: { data: image.base64, mimeType: image.mimeType },
    };

    const resp = await model.generateContent([prompt, imagePart]);
    return JSON.parse(resp.response.text() || "{}");
  }
}