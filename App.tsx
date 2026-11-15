import React, { useState } from 'react';
import { TerminalOutput } from './components/TerminalOutput';
import { parseSQF } from './services/sqfParser';
import { generateSquad } from './services/squadGenerator';
import { FactionType } from './types';

function App() {
  const [inputSQF, setInputSQF] = useState('');
  const [selectedFaction, setSelectedFaction] = useState<FactionType>(FactionType.BLUFOR);
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setInputSQF(ev.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  const handleGenerate = () => {
    if (!inputSQF.trim()) return;

    try {
      const parsed = parseSQF(inputSQF);
      const generatedSQF = generateSquad(parsed, selectedFaction);
      setOutput(generatedSQF);
    } catch (error) {
      console.error(error);
      setOutput("Error parsing SQF. Please check the format.");
    }
  };

  return (
    <div className="min-h-screen bg-military-900 text-gray-200 p-4 md:p-8 font-sans selection:bg-military-accent selection:text-black">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="border-l-4 border-military-accent pl-4 py-2 mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-white">Squad Gen <span className="text-military-accent">A3</span></h1>
          <p className="text-military-400 text-sm font-mono mt-1">LOADOUT PARSER & FACTION GENERATOR</p>
        </header>

        {/* Controls */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Column 1: Input */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-military-800 p-1 border border-military-700 rounded shadow-md">
              <textarea
                className="w-full h-64 bg-military-900 p-4 text-xs font-mono text-gray-400 focus:text-gray-200 focus:outline-none resize-none placeholder-military-600"
                placeholder="// Paste standard SQF loadout here...&#10;removeAllWeapons this;&#10;..."
                value={inputSQF}
                onChange={(e) => setInputSQF(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer bg-military-800 px-4 py-2 border border-military-600 rounded hover:bg-military-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span className="text-sm font-mono">{fileName || "Import .sqf File"}</span>
                <input type="file" accept=".sqf,.txt" className="hidden" onChange={handleFileUpload} />
              </label>
              <button 
                onClick={() => { setInputSQF(''); setFileName(null); }}
                className="text-xs text-military-500 hover:text-military-400 underline"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Column 2: Settings */}
          <div className="space-y-6">
            <div className="bg-military-800 p-4 rounded border border-military-700 shadow-md">
              <label className="block text-xs font-bold text-military-400 uppercase mb-2 tracking-widest">Target Faction</label>
              <div className="space-y-2">
                {Object.values(FactionType).map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFaction(f)}
                    className={`w-full text-left px-4 py-3 rounded border transition-all duration-200 flex items-center justify-between group ${
                      selectedFaction === f 
                      ? 'bg-military-700 border-military-accent text-white shadow-[0_0_10px_rgba(130,201,30,0.2)]' 
                      : 'bg-military-900 border-military-700 text-military-500 hover:border-military-500'
                    }`}
                  >
                    <span className="font-mono font-bold">{f}</span>
                    {selectedFaction === f && <div className="w-2 h-2 bg-military-accent rounded-full animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-4 bg-military-accent text-black font-bold uppercase tracking-widest rounded hover:bg-green-400 transition-all shadow-lg active:transform active:scale-95"
            >
              Generate Squad
            </button>
          </div>
        </div>

        {/* Output Area */}
        <TerminalOutput content={output} />

      </div>
    </div>
  );
}

export default App;