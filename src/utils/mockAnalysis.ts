// Real analysis function that calls the bashguard API
export const analyzeBashScript = async (script: string): Promise<string> => {
  const response = await fetch('http://localhost:8000/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ script_bytes: script }),
  });

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.statusText}`);
  }

  const response_json = await response.json();
  
  return response_json.report;
};