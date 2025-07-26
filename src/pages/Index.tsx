import { useState } from 'react';
import { Header } from '@/components/Header';
import { BashEditor } from '@/components/BashEditor';
import { ResultsPanel } from '@/components/ResultsPanel';
import { analyzeBashScript } from '@/utils/mockAnalysis';
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
  const [report, setReport] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (scriptToAnalyze?: string) => {
    const currentScript = scriptToAnalyze ?? script;
    if (!currentScript.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const analysisReport = await analyzeBashScript(currentScript);
      setReport(analysisReport);
      
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
    // Mock download functionality
    toast({
      title: "Download Started",
      description: `Downloading report in JSON format...`,
    });
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
              report={report}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
