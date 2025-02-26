import ChipSelect from "@/components/atoms/ChipSelect";
import StepTitle from "@/components/atoms/StepTitle";
import { EquipmentCategoryMap } from "@/constants/dummy";
import { formatEnumString } from "@/lib/utils";
import React from "react";
import { StepProps } from "../first/SelectCategory";
import CreateLabel from "@/components/atoms/CreateLabel";

export default function SelectType({ post, setPost }: StepProps) {
  return (
    <div>
      <StepTitle
        text="Hi Daniel, Fill detail of your 
Equipment "
        boldWord="Equipment"
      />
      <div className="px-[24px]">
        <CreateLabel
          label={`${formatEnumString(post.category!)} Equipment Type`}
        />

        <div className="mt-[20px] flex flex-wrap gap-5">
          {/* @ts-expect-error post.category is always an index */}
          {EquipmentCategoryMap[post.category!]?.map((type, index) => {
            return (
              <div key={index}>
                <ChipSelect
                  label={formatEnumString(type)}
                  onClick={() => setPost({ ...post, type })}
                  selected={post.type === type}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
