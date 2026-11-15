import React from 'react';

interface TerminalOutputProps {
  content: string;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!content) return;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'squad_loadout.sqf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!content) return null;

  return (
    <div className="mt-6 border border-military-600 rounded bg-military-900 relative group overflow-hidden shadow-xl">
      <div className="flex justify-between items-center px-4 py-2 bg-military-800 border-b border-military-700">
        <span className="text-xs font-mono text-military-400">OUTPUT.SQF</span>
        <div className="flex gap-2">
           <button 
            onClick={handleDownload}
            className="text-xs font-mono px-3 py-1 rounded transition-colors bg-military-700 text-military-accent hover:bg-military-600"
          >
            DOWNLOAD .SQF
          </button>
          <button 
            onClick={handleCopy}
            className={`text-xs font-mono px-3 py-1 rounded transition-colors ${copied ? 'bg-military-accent text-black' : 'bg-military-700 text-military-accent hover:bg-military-600'}`}
          >
            {copied ? 'COPIED!' : 'COPY SQF'}
          </button>
        </div>
      </div>
      <textarea 
        readOnly
        value={content}
        className="w-full h-96 p-4 bg-military-900 text-gray-300 font-mono text-sm resize-none focus:outline-none scrollbar-thin scrollbar-thumb-military-700"
      />
    </div>
  );
};