export enum AppState {
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  DOWNLOAD = 'DOWNLOAD'
}

export interface ProcessingStatus {
  step: 'idle' | 'analyzing' | 'translating' | 'generating_audio' | 'complete' | 'error';
  message: string;
  progress: number;
  error?: string;
}

export interface TranslationResult {
  chineseScript: string;
  khmerTranslation: string;
  audioUrl?: string; // Blob URL for the generated audio
  videoUrl?: string; // Blob URL for the uploaded video
}

export interface FileData {
  file: File;
  previewUrl: string;
  base64: string;
  mimeType: string;
}