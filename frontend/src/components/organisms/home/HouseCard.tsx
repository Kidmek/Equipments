import OrangeChip from "@/components/atoms/OrangeChip";
import { HouseType } from "@/constants/types";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./houseCard.module.css";
import Typography from "@/components/atoms/Typography";

type Props = {
  house: HouseType;
};

export default function HouseCard({ house }: Props) {
  const [hearted, setHearted] = useState(house.hearted);

  const renderFooterIcons = (src: string, value: string) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8.2px",
        }}
      >
        <Image
          alt="unavailable"
          src={src}
          width={30}
          height={30}
          className={styles.icon}
        />
        <div>{value}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div>
        <Image
          src={house.image}
          alt={house.title}
          className={styles.image}
          height={245}
          width={100}
          sizes="100%"
        />
        <div className={styles.imageTop}>
          {house.featured ? <OrangeChip label="Featured" /> : <div />}
          <HeartIcon
            style={{
              color: "var(--orange)",
              fill: hearted ? "var(--orange)" : undefined,
              cursor: "pointer",
            }}
            onClick={() => {
              house.hearted = !house.hearted;
              setHearted(house.hearted);
            }}
          />
        </div>
      </div>
      <div className={styles.textContainer}>
        <Typography
          color="var(--primary)"
          className="font-poppins"
          variant="large"
        >
          {house.title}
        </Typography>
        <div className={styles.price}>
          <Typography
            color="white"
            className="font-poppins line-through decoration-[1.5px] decoration-[orange]"
            size={9}
          >
            {house.originalPrice} Br.
          </Typography>
          <Typography
            color="white"
            className="font-poppins"
            size={11}
            weight="700"
          >
            {house.discountedPrice} Br./Monthly
          </Typography>
        </div>
        <div className={`${styles.subTitle} ${styles.title}`}>
          {house.subCity} , {house.city} , {house.country}
        </div>
        <div className={styles.footer}>
          <div>
            {renderFooterIcons("/home/bed.png", "3")}
            {renderFooterIcons("/home/bath.png", "2")}
            {renderFooterIcons("/home/map.png", "140 m2")}
          </div>

          {/* <div>LOGO Plc.</div> */}
        </div>
      </div>
    </div>
  );
}
