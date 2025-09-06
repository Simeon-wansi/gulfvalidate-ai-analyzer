// Debug utility for analysis pipeline
export const debugAnalysis = (stage: string, data: unknown) => {
  console.group(`🔍 Analysis Debug - ${stage}`);
  console.log('Data:', data);
  console.log('Type:', typeof data);
  if (data && typeof data === 'object') {
    console.log('Keys:', Object.keys(data));
    if (data.constructor.name !== 'Object') {
      console.log('Constructor:', data.constructor.name);
    }
  }
  console.log('Timestamp:', new Date().toISOString());
  console.groupEnd();
};

export const debugLocalStorage = () => {
  console.group('🗄️ LocalStorage Analysis Data');
  const analysisRequest = localStorage.getItem('analysisRequest');
  const analysisResults = localStorage.getItem('analysisResults');
  
  console.log('Analysis Request:', analysisRequest ? JSON.parse(analysisRequest) : 'Not found');
  console.log('Analysis Results:', analysisResults ? JSON.parse(analysisResults) : 'Not found');
  console.groupEnd();
};

export const debugApiFlow = (step: string, request?: unknown, response?: unknown, error?: Error | unknown) => {
  console.group(`🔄 API Flow - ${step}`);
  if (request) console.log('Request:', request);
  if (response) console.log('Response:', response);
  if (error) console.error('Error:', error);
  console.groupEnd();
};
