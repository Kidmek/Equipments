import Typography from "@/components/atoms/Typography";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function AddPostPage() {
  return (
    <div className="py-[14px] px-[24px]">
      <div className="flex items-center">
        <ChevronLeft />
        <Typography size={15} weight="700" className="mx-auto font-lato">
          Add Listing
        </Typography>
      </div>
      <div className="mt-[50px]">
        <Typography
          size={25}
          weight="500"
          className="font-lato"
          color="#0F022C"
        >
          Hi Daniel, Fill detail of your
          <Typography
            size={25}
            weight="700"
            className="font-lato"
            color="black"
          >
            Real estate
          </Typography>
        </Typography>
      </div>
    </div>
  );
}
