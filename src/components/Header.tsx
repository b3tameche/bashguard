import { Shield, Github } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">BashGuard</h1>
              <p className="text-sm text-muted-foreground">Vulnerability Detection for Bash Scripts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right text-sm text-muted-foreground">
              <p>Paste or write bash scripts</p>
              <p>Get instant security analysis</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};