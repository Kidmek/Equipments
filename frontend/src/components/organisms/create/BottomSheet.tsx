"use client";

import React from "react";
import { Check, X, XIcon } from "lucide-react"; // Close icon
import Typography from "@/components/atoms/Typography";
import Loader from "@/components/atoms/Loader";

export default function BottomSheet({
  isOpen,
  isLoading,
  response,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
}: {
  isOpen: boolean;
  isLoading: boolean;
  response: {
    success: boolean;
    message: string;
  };
  onClose: () => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}) {
  if (!isOpen) return null;
  const circleColor = response.success ? "#FF8E00" : "#FF4D4D";

  return (
    <div
      className="fixed inset-0 bg-black 
    bg-opacity-50 flex items-end justify-center z-50 "
    >
      <div
        className="bg-white rounded-t-3xl w-full h-[70vh] 
      p-6 flex flex-col justify-between max-w-lg"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* ✅❌ Success/Error Icon Container */}
        <div className="flex justify-center pt-10">
          <div
            className="relative flex items-center justify-center w-[70px] h-[70px] rounded-full"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${
                response.success ? "#FF8E00" : "#FF4D4D"
              } 10%, ${response.success ? "#FF8E00" : "#FF4D4D"} 70%)`,
              boxShadow: `0 0 20px 10px ${
                response.success
                  ? "rgba(255, 142, 0, 0.5)"
                  : "rgba(255, 77, 77, 0.5)"
              }`,
            }}
          >
            {/* Blur Effect Layers */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${circleColor} 10%, ${circleColor} 50%)`,
                opacity: 0.1,
                filter: "blur(10px)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${circleColor} 10%, ${circleColor} 50%)`,
                opacity: 0.15,
                filter: "blur(10px)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${circleColor} 5%, ${circleColor} 98%)`,
              }}
            />

            {/* Centered Icon */}
            <div className="absolute flex items-center justify-center w-full h-full">
              {response.success ? (
                <Check size={40} color="white" />
              ) : (
                <XIcon size={40} color="white" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center flex-1">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Typography size={20} weight="700" className="mb-4 text-center">
                {response.message}
              </Typography>
            </>
          )}
        </div>

        {/* Buttons */}
        {!isLoading && (
          <div className="flex gap-4">
            {response.success && (
              <button
                onClick={onSecondaryAction}
                className="flex-1 bg-gray-200 py-3 rounded-lg"
              >
                Add More
              </button>
            )}
            <button
              onClick={onPrimaryAction}
              className="flex-1 bg-primary text-white py-3 rounded-lg"
            >
              {response.success ? "Finish" : "Try Again"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
