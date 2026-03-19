"use client";

import { X, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

type AddAuctionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function AddAuctionModal({ isOpen, onClose, onSuccess }: AddAuctionModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startPrice: "",
    durationHours: "24",
    startTime: "",
  });

  // Store raw File objects for Cloudinary + URLs for the UI previews
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (selectedFiles.length + files.length > 4) {
      setError("Maximum 4 photos allowed");
      return;
    }

    const newFiles = Array.from(files);
    setSelectedFiles(prev => [...prev, ...newFiles]);

    // Create temporary browser URLs for UI previews
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePhoto = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]); // Clean up browser memory
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error("Cloudinary configuration missing in .env");
      }

      const uploadedImageUrls: string[] = [];

      // STEP 1: UPLOAD TO CLOUDINARY
      if (selectedFiles.length > 0) {
        setUploadStatus("Uploading images to Cloudinary...");
        
        for (const file of selectedFiles) {
          const uploadData = new FormData();
          uploadData.append("file", file); 
          uploadData.append("upload_preset", UPLOAD_PRESET);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: uploadData }
          );

          if (!res.ok) throw new Error("Cloudinary upload failed");
          
          const data = await res.json();
          uploadedImageUrls.push(data.secure_url);
        }
      }

      // STEP 2: FORMAT DATA FOR ZOD
      // Zod's .datetime() requires a strict ISO string (e.g., "2026-03-19T10:30:00.000Z")
      let formattedStartTime = undefined;
      if (formData.startTime) {
        formattedStartTime = new Date(formData.startTime).toISOString();
      }

      // STEP 3: SAVE TO DATABASE
      setUploadStatus("Saving auction to database...");
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auction/create`,
        {
          title: formData.title,
          description: formData.description,
          photo: uploadedImageUrls,
          // 🔥 FIX: parseInt ensures Zod's .int() validation passes
          startPrice: parseInt(formData.startPrice), 
          durationHours: parseInt(formData.durationHours),
          startTime: formattedStartTime, 
        },
        { withCredentials: true }
      );

      // 🔥 FIX: Catch the "Silent Failure" where backend sends 200 but includes an error
      if (response.data && response.data.error) {
        throw new Error(response.data.error);
      }

      if (response.status === 201 || response.status === 200) {
        onSuccess?.();
        handleClose();
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      setError(err.response?.data?.error || err.message || "Failed to create auction");
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
    }
  };

  const handleClose = () => {
    setFormData({ title: "", description: "", startPrice: "", durationHours: "24", startTime: "" });
    setSelectedFiles([]);
    previews.forEach(url => URL.revokeObjectURL(url)); 
    setPreviews([]);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f1012] shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0f1012] px-8 py-6">
          <h2 className="text-2xl font-semibold text-white">List New Item</h2>
          <button onClick={handleClose} className="rounded-lg p-2 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Image Upload Section */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-300">Item Photos (Optional, Max 4)</label>
            <div className="flex items-center gap-2">
              {previews.map((url, index) => (
                <div key={index} className="relative group">
                  <img src={url} alt="Preview" className="h-14 w-14 rounded-md object-cover border border-white/10" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    disabled={isSubmitting}
                    className="absolute -top-1 -right-1 rounded-full bg-red-500 p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}

              {selectedFiles.length < 4 && (
                <label className={`flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-white/10 bg-[#16171f]/50 hover:border-[#867afe]/50 transition-all ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
                  <ImageIcon size={18} className="text-gray-400" />
                  <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" disabled={isSubmitting} />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Item Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white focus:border-[#867afe] outline-none"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white focus:border-[#867afe] outline-none resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Starting Price ($) *</label>
              <input
                type="number"
                required
                value={formData.startPrice}
                onChange={(e) => setFormData({ ...formData, startPrice: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white focus:border-[#867afe] outline-none"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Duration *</label>
              <select
                value={formData.durationHours}
                onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white focus:border-[#867afe] outline-none cursor-pointer"
                disabled={isSubmitting}
              >
                <option value="1">1 hour</option>
                <option value="6">6 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
                <option value="72">3 days</option>
                <option value="168">7 days</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Start Time (Optional)</label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              min={new Date().toISOString().slice(0, 16)}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#867afe] cursor-pointer [color-scheme:dark] disabled:opacity-50"
            />
            <p className="mt-1 text-xs text-gray-500">Leave empty to start immediately</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6">
            <span className="text-sm text-[#867afe] font-medium mr-auto">{isSubmitting && uploadStatus}</span>
            <button type="button" onClick={handleClose} disabled={isSubmitting} className="px-6 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[#867afe] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#9c8fff] transition-all disabled:opacity-50 min-w-[120px]"
            >
              {isSubmitting ? "Processing..." : "List Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}