import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-white border-t border-stone-200 text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-emerald-800 font-serif font-bold text-2xl mb-3">Scam Shield</h3>
        <p className="text-stone-500 text-base font-medium mb-8">A Family Digital Safety Initiative. &copy; {new Date().getFullYear()}</p>
        
        <div className="max-w-3xl mx-auto border-t border-stone-200 pt-8">
            <p className="text-stone-400 text-sm leading-relaxed font-sans">
              <strong>Please Note:</strong> We’re extremely cautious and may flag some real messages as suspicious just to be safe. 
              However, no tool can catch every scam. When in doubt, ignore the message or call the company using a number you already trust. 
              This tool provides a second opinion, not legal or financial advice.
            </p>
        </div>
      </div>
    </footer>
  );
};