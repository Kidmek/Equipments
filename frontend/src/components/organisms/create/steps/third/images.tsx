/* eslint-disable @next/next/no-img-element */
import React from "react";
import StepTitle from "@/components/atoms/StepTitle";
import { StepProps } from "../first/SelectCategory";
import { PlusIcon } from "@/constants/images";
import { MinusIcon } from "lucide-react";

export default function SelectImages({ post, setPost }: StepProps) {
  // Handle image selection and store as File object
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImages = post.images
        ? [...post.images]
        : [null, null, null, null];
      newImages[index] = file; // Store file object
      setPost({ ...post, images: newImages });
    }
  };

  // Remove image from post.images
  const handleRemoveImage = (index: number) => {
    const newImages = post.images ? [...post.images] : [null, null, null, null];
    newImages[index] = null;
    setPost({ ...post, images: newImages });
  };

  return (
    <div>
      <StepTitle text="Add photos to your listing" boldWord="photos" />
      <div className="px-[24px]">
        <div className="grid grid-cols-2 gap-4">
          {(post.images || [null, null, null, null]).map(
            (image: File | null, index: number) => (
              <div
                key={index}
                className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg shadow-sm h-40 cursor-pointer hover:shadow-md transition-shadow duration-300"
              >
                {image ? (
                  <>
                    {/* Display selected image */}
                    <img
                      src={image && URL.createObjectURL(image)} // Use Object URL for preview
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {/* Remove Icon */}
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-400 rounded-full p-1 shadow"
                    >
                      <MinusIcon />
                    </button>
                  </>
                ) : (
                  <>
                    {/* Plus Icon for Upload */}
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <PlusIcon />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        className="hidden"
                      />
                    </label>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
