import React, { ReactNode } from 'react';

// This component is kept for compatibility but renders a simple div
// The new design uses specific card styles in the components themselves.
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-3xl ${className}`}>
      {children}
    </div>
  );
};