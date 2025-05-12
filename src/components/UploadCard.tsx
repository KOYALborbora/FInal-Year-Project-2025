"use client";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/useAppStore";
import { useRouter } from "next/navigation";
import * as React from "react";

export function UploadCard() {
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const setAnalysisResult = useAppStore((state) => state.setAnalysisResult);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setError("Please upload a valid image file.");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setError("Please upload a valid image file.");
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleRemoveImage() {
    setImage(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image || !text) {
      setError("Please provide both an image and text.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);

    // Clear previous analysis result before uploading a new image
    setAnalysisResult(null); // Clear the state to avoid showing outdated data

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      console.log("API Response:", data);
      setAnalysisResult(data); // Store the result in shared state
      router.push("/dashboard/analyze");
    } catch (err) {
      console.error("Error:", err);
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="w-full max-w-lg bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-foreground mb-2">Upload for Analysis</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-xl p-6 cursor-pointer bg-indigo-50/40 dark:bg-indigo-900/20 hover:bg-indigo-100/60 transition relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          {imagePreview ? (
            <div className="relative w-32 h-32 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg shadow" />
              <button type="button" onClick={handleRemoveImage} className="absolute top-1 right-1 bg-white/80 rounded-full px-2 py-1 text-xs text-red-600 shadow hover:bg-white">Remove</button>
            </div>
          ) : (
            <>
              <span className="text-indigo-500 font-semibold text-lg mb-1">Drag & drop an image here</span>
              <span className="text-xs text-muted-foreground">or click to select</span>
            </>
          )}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {error && <div className="text-sm text-red-600 text-center">{error}</div>}
        <div className="flex flex-col gap-1">
          <label htmlFor="text-input" className="text-sm font-medium text-foreground">Text for Analysis</label>
          <textarea
            id="text-input"
            className="rounded-md border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 transition min-h-[100px]"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type or paste text here..."
          />
        </div>
        <Button type="button" size="lg" className="w-full mt-2" onClick={handleSubmit}>Analyze</Button>
      </form>
    </div>
  );
}