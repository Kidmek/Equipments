import StepTitle from "@/components/atoms/StepTitle";
import React from "react";
import { StepProps } from "../first/SelectCategory";
import CreateInput from "@/components/molecules/CreateInput";

export default function Details({ post, setPost }: StepProps) {
  return (
    <div>
      <StepTitle
        text="Almost finished , fill in more details"
        boldWord="Almost finished"
      />
      <div className="flex flex-col gap-7">
        <CreateInput
          label="Price"
          value={post.price ?? ""}
          setValue={(v) => setPost({ ...post, price: v })}
          type="number"
        />
        <CreateInput
          label="Quantity"
          value={post.quantity ?? ""}
          setValue={(v) => setPost({ ...post, quantity: v })}
          type="number"
        />
        <CreateInput
          label="Phone"
          value={post.phone ?? ""}
          setValue={(v) => setPost({ ...post, phone: v })}
          type="number"
        />
        <CreateInput
          label="Description"
          value={post.description ?? ""}
          setValue={(v) => setPost({ ...post, description: v })}
          type="textarea"
        />
      </div>
    </div>
  );
}
