import { useState } from 'react';
import { Header } from '@/components/Header';
import { BashEditor } from '@/components/BashEditor';
import { ResultsPanel } from '@/components/ResultsPanel';
import { analyzeBashScript, AnalysisResult } from '@/utils/mockAnalysis';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [script, setScript] = useState(`#!/bin/bash
# Example bash script
echo "Hello World"
name=$1
echo "Hello $name"
eval "$name"
`);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (scriptToAnalyze?: string) => {
    const currentScript = scriptToAnalyze ?? script;
    if (!currentScript.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeBashScript(currentScript);
      setAnalysisResult(result);

      toast({
        title: "Analysis Complete",
        description: "Script analysis completed successfully.",
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your script. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (!analysisResult?.json_report) {
      toast({
        title: "No Report Available",
        description: "Please analyze a script first to download the JSON report.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Parse the JSON report if it's a string, otherwise use as-is
      let jsonData = analysisResult.json_report;
      jsonData = JSON.parse(jsonData as string);
      
      // Create a blob with the properly formatted JSON data
      const jsonString = JSON.stringify(jsonData, null, 4);
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bashguard-analysis-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);

      toast({
        title: "Download Complete",
        description: "JSON analysis report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the report. Please try again.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-rows-2 gap-6 h-[calc(100vh-200px)]">
          {/* Editor Section */}
          <div className="min-h-[300px]">
            <BashEditor
              value={script}
              onChange={setScript}
              onAnalyze={handleAnalyze}
            />
          </div>
          
          {/* Results Section */}
          <div className="min-h-[250px]">
            <ResultsPanel
              isAnalyzing={isAnalyzing}
              report={analysisResult?.text_report || null}
              hasJsonReport={!!(analysisResult?.json_report && 
                (typeof analysisResult.json_report === 'object' || 
                 (typeof analysisResult.json_report === 'string' && analysisResult.json_report.trim())))}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
