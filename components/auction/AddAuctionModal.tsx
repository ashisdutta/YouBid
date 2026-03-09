"use client";

import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";

type AddAuctionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function AddAuctionModal({ isOpen, onClose, onSuccess }: AddAuctionModalProps) {
  console.log("Modal rendered, isOpen:", isOpen);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photos: [] as string[],
    startPrice: "",
    durationHours: "24",
    startTime: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (formData.photos.length + files.length > 4) {
      setError("Maximum 4 photos allowed");
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.photos.length === 0) {
      setError("Please upload at least one photo");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auction/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          photo: formData.photos[0],
          startPrice: parseFloat(formData.startPrice),
          durationHours: parseInt(formData.durationHours),
          startTime: formData.startTime || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create auction");
      }

      onSuccess?.();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      photos: [],
      startPrice: "",
      durationHours: "24",
      startTime: "",
    });
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop - with blur effect */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f1012] shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0f1012] px-8 py-6">
          <h2 className="text-2xl font-semibold text-white">List New Item</h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-300">
              Item Photos * (Max 4)
            </label>
            
            <div className="flex items-center gap-2">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Preview ${index + 1}`}
                    className="h-14 w-14 rounded-md object-cover border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-1 -right-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                  >
                    <X size={10} />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-0.5 left-0.5 rounded bg-[#867afe] px-1 py-0.5 text-[8px] font-semibold text-white">
                      Main
                    </span>
                  )}
                </div>
              ))}

              {formData.photos.length < 4 && (
                <label className="flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-white/10 bg-[#16171f]/50 transition-colors hover:border-[#867afe]/50 hover:bg-[#16171f]">
                  <ImageIcon size={18} className="text-gray-400" />
                  <span className="text-[8px] text-gray-500 mt-0.5">
                    {formData.photos.length}/4
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              First photo will be the main display image
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Item Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Vintage Rolex Submariner"
              className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-[#867afe] focus:bg-[#16171f]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your item in detail..."
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-[#867afe] focus:bg-[#16171f] resize-none"
              required
            />
          </div>

          {/* Two columns for price and duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Starting Price ($) *
              </label>
              <input
                type="number"
                value={formData.startPrice}
                onChange={(e) => setFormData({ ...formData, startPrice: e.target.value })}
                placeholder="100"
                min="1"
                step="0.01"
                className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition-all focus:border-[#867afe] focus:bg-[#16171f]"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Duration *
              </label>
              <select
                value={formData.durationHours}
                onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#867afe] focus:bg-[#16171f] cursor-pointer"
                required
              >
                <option value="1">1 hour</option>
                <option value="6">6 hours</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours (1 day)</option>
                <option value="48">48 hours (2 days)</option>
                <option value="72">72 hours (3 days</option>
                <option value="168">7 days</option>
              </select>
            </div>
          </div>

          {/* Start Time */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Start Time (Optional)
            </label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full rounded-lg border border-white/10 bg-[#16171f]/50 px-4 py-3 text-sm text-white outline-none transition-all focus:border-[#867afe] focus:bg-[#16171f] cursor-pointer [color-scheme:dark]"
            />
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to start immediately
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 pb-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[#867afe] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#9c8fff] active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "List Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}