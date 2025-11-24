import React, { useState, useRef } from 'react';
import { X, Upload, ShieldCheck, AlertTriangle, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanStatus, ThreatLevel, ScanResult } from '@/types/scannerModal';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ScanStatus>(ScanStatus.IDLE);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ===========================================================================
  // CONFIGURATION
  // ===========================================================================
  // API endpoint for the existing backend
  const BACKEND_ENDPOINT = "/api/check-scam";
  // ===========================================================================

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleScan = async () => {
    if (!text && !file) return;

    setStatus(ScanStatus.ANALYZING);
    setResult(null);

    try {
      let base64Image = undefined;
      let mimeType = undefined;

      // 1. Convert Image to Base64 if it exists
      if (file) {
        mimeType = file.type;
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Remove the "data:image/png;base64," prefix
            const base64 = result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      // 2. Send Payload to your Backend
      console.log("Sending to backend:", BACKEND_ENDPOINT);
      
      const response = await fetch(BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          imageBase64: base64Image,
          contextWhoFor: 'self'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Backend Error: ${response.status} ${response.statusText}`);
      }

      // 3. Handle Response
      const data = await response.json();

      // Map the existing API response format to our ScanResult type
      const verdictMap: Record<string, ThreatLevel> = {
        'high_scam': ThreatLevel.DANGER,
        'suspicious': ThreatLevel.SUSPICIOUS,
        'no_obvious_scam': ThreatLevel.SAFE,
      };

      const validResult: ScanResult = {
        threatLevel: verdictMap[data.verdict] || ThreatLevel.SUSPICIOUS,
        summary: data.summary || "Analysis complete.",
        advice: data.safeSteps?.join(' ') || "Please proceed with caution."
      };

      setResult(validResult);
      setStatus(ScanStatus.COMPLETE);

    } catch (e) {
      console.error("Scan failed:", e);
      setStatus(ScanStatus.ERROR);
    }
  };

  const reset = () => {
    setStatus(ScanStatus.IDLE);
    setText('');
    setFile(null);
    setResult(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50">
              <h2 className="text-2xl font-serif font-bold text-ink flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-700" />
                Security Check
              </h2>
              <button onClick={onClose} className="text-stone-500 hover:text-stone-800 p-2 rounded-full hover:bg-stone-200 transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
              {status === ScanStatus.IDLE && (
                <div className="space-y-8">
                  <div>
                    <label className="block text-xl font-bold text-ink mb-3">
                      1. Paste the message here
                    </label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="e.g. 'Mom, I lost my phone, please send money...'"
                      className="w-full h-40 bg-white border-2 border-stone-300 rounded-xl p-5 text-ink text-lg focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none resize-none placeholder-stone-400 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-bold text-ink mb-3">
                      Or upload a picture
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-stone-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all group bg-stone-50"
                    >
                      <Upload className="w-10 h-10 text-stone-400 group-hover:text-emerald-600 mb-3 transition-colors" />
                      <p className="text-ink text-lg font-medium group-hover:text-emerald-700 transition-colors">
                        {file ? file.name : "Click to select a screenshot"}
                      </p>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <button
                    onClick={handleScan}
                    disabled={!text && !file}
                    className="w-full py-5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-xl text-white font-bold text-xl shadow-lg transition-all active:scale-[0.98]"
                  >
                    Check Safety Now
                  </button>
                </div>
              )}

              {status === ScanStatus.ANALYZING && (
                <div className="flex flex-col items-center justify-center py-20 space-y-8">
                  <div className="relative">
                    <Loader2 className="w-20 h-20 text-emerald-600 animate-spin relative z-10" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-ink mb-2">Analyzing...</h3>
                    <p className="text-stone-600 text-lg">Please wait while we check for scams.</p>
                  </div>
                </div>
              )}

              {status === ScanStatus.COMPLETE && result && (
                <div className="space-y-8">
                  <div className={`p-8 rounded-xl border-l-8 ${
                    result.threatLevel === ThreatLevel.SAFE ? 'bg-emerald-50 border-emerald-500' :
                    result.threatLevel === ThreatLevel.SUSPICIOUS ? 'bg-amber-50 border-amber-500' :
                    'bg-red-50 border-red-600'
                  }`}>
                    <div className="flex items-center gap-6 mb-6">
                      {result.threatLevel === ThreatLevel.SAFE && <CheckCircle className="w-16 h-16 text-emerald-600" />}
                      {result.threatLevel === ThreatLevel.SUSPICIOUS && <AlertTriangle className="w-16 h-16 text-amber-600" />}
                      {result.threatLevel === ThreatLevel.DANGER && <AlertTriangle className="w-16 h-16 text-red-600" />}
                      
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-1">Result</p>
                        <h3 className={`text-4xl font-serif font-bold ${
                          result.threatLevel === ThreatLevel.SAFE ? 'text-emerald-800' :
                          result.threatLevel === ThreatLevel.SUSPICIOUS ? 'text-amber-800' :
                          'text-red-800'
                        }`}>{result.threatLevel === ThreatLevel.SAFE ? 'It seems Safe' : result.threatLevel}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-bold text-ink mb-2">Explanation:</h4>
                        <p className="text-stone-800 text-lg leading-relaxed">{result.summary}</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
                        <h4 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
                           Recommended Action <ArrowRight className="w-5 h-5" />
                        </h4>
                        <p className="text-ink text-lg font-medium leading-relaxed">{result.advice}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-4 bg-white hover:bg-stone-100 text-ink font-bold text-lg rounded-xl border-2 border-stone-200 transition-colors"
                  >
                    Check Another Message
                  </button>
                </div>
              )}

              {status === ScanStatus.ERROR && (
                 <div className="text-center py-16">
                   <div className="bg-red-50 p-6 rounded-full inline-block mb-6">
                     <AlertTriangle className="w-12 h-12 text-red-500" />
                   </div>
                   <h3 className="text-3xl font-bold text-ink mb-4">Connection Error</h3>
                   <p className="text-stone-600 mb-10 text-xl max-w-md mx-auto">Please ensure your backend server is running.</p>
                   <button onClick={reset} className="px-10 py-4 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-white font-bold text-lg">Try Again</button>
                 </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};