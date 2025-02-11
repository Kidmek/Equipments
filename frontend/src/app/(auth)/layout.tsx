import { Logo } from "@/constants/images";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col items-center pt-[10vh]">
      <div className="w-[60vw]">
        <Image src={Logo} alt="Logo" layout="responsive" />
      </div>
      <div>{children}</div>
    </div>
  );
}
