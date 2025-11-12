import { useState, useCallback } from "react";
import { GoogleGenAI } from "@google/genai";

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState("");

  const generate = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey });
      const res = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      const text = res.text ?? "";
      setData(text);
      return text;
    } catch (err) {
      setError(err.message || "Bir hata oluştu");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error, data };
}
