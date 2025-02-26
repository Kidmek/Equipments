import React from "react";
import Typography from "./Typography";

export default function StepTitle({
  text,
  boldWord,
}: {
  text: string;
  boldWord: string;
}) {
  // Splitting the text at the bold word to wrap it dynamically
  const parts = text.split(new RegExp(`(${boldWord})`, "gi"));

  return (
    <div className="mt-[50px] mb-[35px]">
      <Typography
        size={25}
        weight="500"
        className="font-lato inline"
        color="#0F022C"
      >
        {parts.map((part, index) =>
          part.toLowerCase() === boldWord.toLowerCase() ? (
            <Typography
              key={index}
              size={25}
              weight="700"
              className="font-lato inline"
              color="black"
            >
              {part}
            </Typography>
          ) : (
            part
          )
        )}
      </Typography>
    </div>
  );
}
