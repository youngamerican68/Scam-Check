// app/components/LoadingSpinner.tsx
"use client";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Analyzing..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-neutral-200"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-medium text-neutral-700">{message}</p>
      <p className="mt-2 text-sm text-neutral-500">
        This may take a few moments...
      </p>
    </div>
  );
}
