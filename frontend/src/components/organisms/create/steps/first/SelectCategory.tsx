import ChipSelect from "@/components/atoms/ChipSelect";
import CreateLabel from "@/components/atoms/CreateLabel";
import StepTitle from "@/components/atoms/StepTitle";
import { EquipmentCategoryMap } from "@/constants/dummy";
import { PostType } from "@/constants/types";
import { formatEnumString } from "@/lib/utils";
import React from "react";

export interface StepProps {
  post: PostType;
  setPost: (post: PostType) => void;
}

export default function SelectCategory({ post, setPost }: StepProps) {
  return (
    <div>
      <StepTitle
        text="Hi Daniel, Fill detail of your 
Equipment "
        boldWord="Equipment"
      />
      <div className="px-[24px]">
        <CreateLabel label="Equipment Category" />
        <div className="mt-[20px] flex flex-wrap gap-5">
          {Object.keys(EquipmentCategoryMap).map((category, index) => {
            return (
              <div key={index}>
                <ChipSelect
                  label={formatEnumString(category)}
                  onClick={() => setPost({ ...post, category })}
                  selected={post.category === category}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
