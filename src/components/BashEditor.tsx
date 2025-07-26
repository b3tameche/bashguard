import { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

interface BashEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: (script?: string) => void;
}

export const BashEditor = ({ value, onChange, onAnalyze }: BashEditorProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleChange = (newValue: string) => {
    onChange(newValue);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for 1 second after user stops typing
    timeoutRef.current = setTimeout(() => {
      if (newValue.trim()) {
        onAnalyze(newValue);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="h-full border border-border rounded-lg overflow-hidden">
      <div className="bg-muted px-4 py-2 border-b border-border">
        <span className="text-sm font-medium text-muted-foreground">Bash Script Editor</span>
      </div>
      <AceEditor
        mode="sh"
        theme="monokai"
        onChange={handleChange}
        value={value}
        name="bash-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          fontSize: 14,
          showPrintMargin: false,
          wrap: true,
        }}
        style={{
          width: '100%',
          height: 'calc(100% - 49px)',
          backgroundColor: 'hsl(var(--editor-bg))',
        }}
        placeholder="Paste or write your bash script here..."
      />
    </div>
  );
};