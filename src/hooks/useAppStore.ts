import { create } from 'zustand';

type User = { email: string; id?: string } | null;
type Upload = { file?: File; text?: string; previewUrl?: string } | null;
type AnalysisResult = {
  textSentiment?: string;
  imageSentiment?: string;
  textScore?: number;
  imageScore?: number;
} | null;

interface AppState {
  user: User;
  setUser: (user: User) => void;

  upload: Upload;
  setUpload: (upload: Upload) => void;
  clearUpload: () => void;

  analysis: AnalysisResult;
  setAnalysis: (result: AnalysisResult) => void;
  clearAnalysis: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  upload: null,
  setUpload: (upload) => set({ upload }),
  clearUpload: () => set({ upload: null }),

  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
  clearAnalysis: () => set({ analysis: null }),
}));