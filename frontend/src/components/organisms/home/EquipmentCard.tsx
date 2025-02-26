import OrangeChip from "@/components/atoms/OrangeChip";
import { BoxIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./equipmentCard.module.css";
import Typography from "@/components/atoms/Typography";
import { SingleEquipmentType } from "@/constants/types";
import { formatEnumString, getImageUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  equipment: SingleEquipmentType;
};

export default function EquipmentCard({ equipment }: Props) {
  const router = useRouter();
  const [hearted, setHearted] = useState(false);

  return (
    <div
      className={styles.container}
      onClick={() => {
        router.push(`/home/${equipment.id}`);
      }}
    >
      <div>
        <Image
          src={getImageUrl(equipment.images.at(0))}
          alt={"Equipment Image"}
          className={styles.image}
          height={245}
          width={100}
          sizes="100%"
          unoptimized={true}
        />
        <div className={styles.imageTop}>
          {equipment.featured ? <OrangeChip label="Featured" /> : <div />}
          <HeartIcon
            style={{
              color: "var(--orange)",
              fill: hearted ? "var(--orange)" : undefined,
              cursor: "pointer",
            }}
            onClick={() => {
              setHearted(!hearted);
            }}
          />
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={`${styles.subTitle} ${styles.title}`}>
          {formatEnumString(equipment.category)} ,{" "}
          {formatEnumString(equipment.type)}
        </div>
        <Typography
          color="var(--primary)"
          className="font-poppins"
          variant="large"
        >
          {equipment.description}
        </Typography>
        <div className="flex gap-10">
          <div className={styles.price}>
            <Typography
              color="white"
              className="font-poppins"
              size={11}
              weight="700"
            >
              {equipment.price} Br
            </Typography>
          </div>
          <div className="flex items-center gap-2 ">
            <BoxIcon />
            <Typography className="text-sm font-semibold">
              {equipment.quantity > 0
                ? `${equipment.quantity} Available`
                : "Out of Stock"}
            </Typography>
          </div>
        </div>

        {/* <div>LOGO Plc.</div> */}
      </div>
    </div>
  );
}
