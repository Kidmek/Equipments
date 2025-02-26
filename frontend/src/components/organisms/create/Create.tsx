"use client";

import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import { ChevronLeft } from "lucide-react";
import IconButton from "@/components/molecules/IconButton";
import { BackIcon } from "@/constants/images";
import { PostType } from "@/constants/types";
import SelectCategory from "./steps/first/SelectCategory";
import SelectType from "./steps/second/SelectType";
import SelectImages from "./steps/third/images";
import Details from "./steps/fourth/Details";
import BottomSheet from "./BottomSheet";
import { useRouter } from "next/navigation";

const STEPS = 4;
export default function AddPost() {
  const router = useRouter();

  const [post, setPost] = useState<PostType>({
    images: [null, null, null, null],
  });
  const [step, setStep] = useState(1);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    message: "",
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SelectCategory post={post} setPost={setPost} />;
      case 2:
        return <SelectType post={post} setPost={setPost} />;
      case 3:
        return <SelectImages post={post} setPost={setPost} />;
      default:
        return <Details post={post} setPost={setPost} />;
    }
  };

  // Convert base64 images to FormData for uploading
  const prepareFormData = async () => {
    const formData = new FormData();
    formData.append("type", post.type || "");
    formData.append("category", post.category || "");
    formData.append("description", post.description || "");
    // Convert to numbers explicitly before appending
    if (post.price) formData.append("price", String(parseFloat(post.price)));
    if (post.quantity)
      formData.append("quantity", String(parseInt(post.quantity, 10)));

    post.images.forEach((image) => {
      if (image) {
        formData.append("images", image); // This keeps the original filename
      }
    });

    return formData;
  };

  // Handle Publish Action
  const onPublish = async () => {
    setIsSheetOpen(true);
    setIsLoading(true);

    try {
      const formData = await prepareFormData();
      const response = await fetch("http://localhost:9000/equipment", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setResponse({
          success: true,
          message: "Your listing has been successfully published!",
        });
      } else {
        const res = await response.json();
        setResponse({
          success: false,
          message: res.error,
        });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setResponse({
        success: false,
        message: "Failed to publish your listing. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-[14px] px-[24px] flex flex-1 flex-col h-full ">
      {/* Header */}
      <div className="flex items-center">
        <ChevronLeft onClick={() => router.back()} />
        <Typography size={15} weight="700" className="mx-auto font-lato">
          Add Listing
        </Typography>
      </div>

      {/* Step Content */}
      <div className="overflow-y-auto pb-10">{renderStep()}</div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between mt-auto ">
        {step > 1 ? (
          <IconButton
            Icon={BackIcon}
            onClick={() => setStep(step - 1)}
            style={{
              borderRadius: "50%",
              backdropFilter: "blur(28px)",
              boxShadow: "0px 17px 80px 0px #FF9900",
              width: "62px",
              height: "62px",
              padding: "0",
              flexDirection: "column",
              justifyContent: "center",
            }}
          />
        ) : (
          <div />
        )}

        <IconButton
          label={step === STEPS ? "Publish" : "Next"}
          onClick={() => {
            if (step === STEPS) {
              onPublish();
            } else {
              setStep(step + 1);
            }
          }}
          bgColor="var(--primary)"
          style={{
            borderRadius: "10px",
          }}
        />
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isSheetOpen}
        isLoading={isLoading}
        response={response}
        onClose={() => setIsSheetOpen(false)}
        onPrimaryAction={() => {
          if (response.success) {
            router.replace("/home");
          } else {
            onPublish();
          }
        }}
        onSecondaryAction={() => {
          setIsSheetOpen(false);
          setStep(1);
          setPost({
            images: [null, null, null, null],
          });
        }}
      />
    </div>
  );
}
