"use client";

import Image from "next/image";

type Props = {
  src: string;
  onClick: () => void;
};

export default function FilterButton({ src, onClick }: Props) {
  return (
    <div
      style={{
        borderWidth: "1px",
        borderColor: "var(--primary)",
        cursor: "pointer",
        borderStyle: "solid",
        borderRadius: "5px",
        height: "38px",
        width: "38px",
        padding: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          borderWidth: "1px",
          borderColor: "var(--primary)",
          margin: "5px",
        }}
      >
        <Image onClick={onClick} alt="img" src={src} width={20} height={10} />
      </div>
    </div>
  );
}
