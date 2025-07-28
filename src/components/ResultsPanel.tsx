import { Button } from "@/components/ui/button";
import { Download, Code, Shield } from "lucide-react";
import AnsiToHtml from 'ansi-to-html';

interface ResultsPanelProps {
  isAnalyzing: boolean;
  report: string | null;
  hasJsonReport: boolean;
  onDownload: () => void;
}

export const ResultsPanel = ({ isAnalyzing, report, hasJsonReport, onDownload }: ResultsPanelProps) => {
  // Create ansi-to-html converter instance
  const ansiConverter = new AnsiToHtml({
    fg: '#fff',
    bg: '#000',
    newline: true,
    escapeXML: true,
  });

  // Convert ANSI to HTML if report exists
  const convertedReport = report ? ansiConverter.toHtml(report) : null;

  return (
    <div className="h-full border border-border rounded-lg bg-results-bg flex flex-col">
      <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between flex-shrink-0">
        <span className="text-sm font-medium text-muted-foreground">
          Analysis Results
        </span>
        {hasJsonReport && (
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            className="h-7 text-xs"
          >
            <Code className="w-3 h-3 mr-1" />
            JSON
          </Button>
        )}
      </div>
      
      <div className="p-4 flex-1 overflow-hidden">
        {isAnalyzing ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Analyzing script...</span>
          </div>
        ) : report ? (
          <div className="h-full">
            <div className="bg-muted/50 p-4 rounded-lg h-full overflow-auto">
              <pre 
                className="whitespace-pre-wrap text-sm font-mono"
                dangerouslySetInnerHTML={{ __html: convertedReport || '' }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Start typing or paste a bash script to analyze</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};