import React, { useState } from 'react';
import { UploadView } from './components/UploadView';
import { ProcessingView } from './components/ProcessingView';
import { DownloadView } from './components/DownloadView';
import { AppState, FileData, TranslationResult } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);

  const handleFileSelect = (data: FileData) => {
    setFileData(data);
    setAppState(AppState.PROCESSING);
  };

  const handleProcessingComplete = (result: TranslationResult) => {
    setTranslationResult(result);
    setAppState(AppState.DOWNLOAD);
  };

  const handleCancelProcessing = () => {
    setFileData(null);
    setAppState(AppState.UPLOAD);
  };

  const handleReset = () => {
    setFileData(null);
    setTranslationResult(null);
    setAppState(AppState.UPLOAD);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <header className="border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">
              Story<span className="text-blue-600">Translate</span>
            </span>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Chinese <span className="mx-1 text-slate-300">→</span> Khmer
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {appState === AppState.UPLOAD && (
          <UploadView onFileSelect={handleFileSelect} />
        )}
        
        {appState === AppState.PROCESSING && fileData && (
          <ProcessingView 
            fileData={fileData}
            onComplete={handleProcessingComplete}
            onCancel={handleCancelProcessing}
          />
        )}

        {appState === AppState.DOWNLOAD && translationResult && (
          <DownloadView 
            result={translationResult}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;