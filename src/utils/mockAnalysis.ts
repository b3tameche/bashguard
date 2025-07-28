// Real analysis function that calls the bashguard API
export interface AnalysisResult {
  text_report: string;
  json_report: Record<string, unknown> | string; // Can be a JSON object or JSON-encoded string
}

export const analyzeBashScript = async (script: string): Promise<AnalysisResult> => {
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

  return {
    text_report: response_json.text_report,
    json_report: response_json.json_report
  };
};