import { GoogleGenAI, Type } from "@google/genai";
import { ThemeTextData, AssetType } from "../types";

// Initialize the API client
// CRITICAL: Using process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TEXT_MODEL = "gemini-2.5-flash";
const IMAGE_MODEL = "gemini-2.5-flash-image"; // Efficient image generation

export const generateThemeText = async (topic: string): Promise<ThemeTextData> => {
  try {
    const prompt = `
      Você é um especialista em design de eventos e branding.
      Crie um conceito de tema completo e criativo baseado no seguinte tópico: "${topic}".
      
      Retorne APENAS um objeto JSON com a seguinte estrutura:
      - title: Um nome cativante para o tema.
      - description: Uma breve descrição da vibe e estética (max 2 frases).
      - colorPalette: Array com 5 códigos hexadecimais de cores que combinam.
      - musicPlaylist: Array com 5 sugestões de músicas ou estilos musicais.
      - eventIdeas: Array com 4 ideias de atividades para o evento.
      - decorationTips: Array com 4 dicas específicas de decoração.
    `;

    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
            musicPlaylist: { type: Type.ARRAY, items: { type: Type.STRING } },
            eventIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
            decorationTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "description", "colorPalette", "musicPlaylist", "eventIdeas", "decorationTips"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    
    return JSON.parse(text) as ThemeTextData;
  } catch (error) {
    console.error("Error generating theme text:", error);
    throw error;
  }
};

export const generateAssetImage = async (topic: string, assetType: AssetType): Promise<string> => {
  try {
    let specificPrompt = "";

    switch (assetType) {
      case AssetType.INVITATION:
        specificPrompt = `Um convite de evento elegante e moderno com o tema: ${topic}. Design gráfico de alta qualidade, tipografia legível, layout profissional.`;
        break;
      case AssetType.SHIRT:
        specificPrompt = `Uma estampa de camiseta (t-shirt design) vetorial e criativa com o tema: ${topic}. Fundo branco, cores vibrantes, estilo merchandise moderno, isolado.`;
        break;
      case AssetType.FLAG:
        specificPrompt = `Uma bandeira oficial simbolizando o tema: ${topic}. Design vexilológico, sem texto, cores distintas, flutuando no vento, alta resolução.`;
        break;
      case AssetType.DECORATION:
        specificPrompt = `Um cenário de decoração de festa com o tema: ${topic}. Iluminação ambiente, design de interiores imersivo, detalhes temáticos, foto realista.`;
        break;
    }

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [{ text: specificPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Extract image from parts
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error(`Error generating image for ${assetType}:`, error);
    throw error;
  }
};