// app/components/ScamCheckForm.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { ContextWhoFor, ScamCheckInput } from "@/types/scamCheck";
import LoadingSpinner from "./LoadingSpinner";

interface ScamCheckFormProps {
  onResult: (result: any) => void;
  onError: (error: string) => void;
}

export default function ScamCheckForm({ onResult, onError }: ScamCheckFormProps) {
  const [text, setText] = useState("");
  const [contextWhoFor, setContextWhoFor] = useState<ContextWhoFor>("self");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const MAX_CHARS = 8000;

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        onError("Please upload a valid image file");
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        onError("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!text.trim()) {
      onError("Please enter the suspicious message text");
      return;
    }

    if (text.length > MAX_CHARS) {
      onError(`Message is too long. Maximum ${MAX_CHARS} characters allowed.`);
      return;
    }

    setIsLoading(true);
    onError(""); // Clear any previous errors

    try {
      const input: ScamCheckInput = {
        text: text.trim(),
        contextWhoFor,
        imageBase64: imagePreview || null,
      };

      const response = await fetch("/api/check-scam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to analyze message");
      }

      const result = await response.json();
      onResult(result);
    } catch (error) {
      console.error("Error checking scam:", error);
      onError(
        error instanceof Error
          ? error.message
          : "We couldn't analyze this message right now. When in doubt, assume risk and DO NOT click or reply. Try again in a few minutes or call someone you trust."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Analyzing for scam patterns..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Text Input */}
      <div>
        <label htmlFor="message-text" className="block text-lg font-semibold text-neutral-900 mb-2">
          Paste the suspicious message here <span className="text-danger-600">*</span>
        </label>
        <textarea
          id="message-text"
          value={text}
          onChange={handleTextChange}
          rows={8}
          placeholder="Copy and paste the email, text message, or chat message you want to check..."
          className="w-full px-4 py-3 text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
          required
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-neutral-500">
            Copy the entire message, including sender info if possible
          </p>
          <p className={`text-sm ${charCount > MAX_CHARS ? 'text-danger-600 font-semibold' : 'text-neutral-500'}`}>
            {charCount} / {MAX_CHARS}
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="message-image" className="block text-lg font-semibold text-neutral-900 mb-2">
          Upload a screenshot (optional)
        </label>
        {!imagePreview ? (
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer bg-white px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
              <span className="text-base text-neutral-700">Choose Image</span>
              <input
                id="message-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-neutral-500">PNG, JPG, or GIF (max 5MB)</p>
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Message preview"
              className="max-w-full h-auto max-h-64 rounded-lg border border-neutral-300"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-danger-600 text-white rounded-full p-2 hover:bg-danger-700 transition-colors"
              aria-label="Remove image"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Context Selection */}
      <div>
        <label htmlFor="who-for" className="block text-lg font-semibold text-neutral-900 mb-2">
          Who is this check for?
        </label>
        <select
          id="who-for"
          value={contextWhoFor}
          onChange={(e) => setContextWhoFor(e.target.value as ContextWhoFor)}
          className="w-full px-4 py-3 text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="self">Myself</option>
          <option value="parent">My parent or grandparent</option>
          <option value="other">Someone else</option>
        </select>
        <p className="text-sm text-neutral-500 mt-2">
          This helps us tailor our explanation to be most helpful
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading || !text.trim() || charCount > MAX_CHARS}
          className="w-full bg-blue-600 text-white text-xl font-bold py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
        >
          🔍 Check this for scams
        </button>
        <p className="text-center text-sm text-neutral-500 mt-3">
          Analysis typically takes 5-15 seconds
        </p>
      </div>
    </form>
  );
}
