"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Eye, Phone } from "lucide-react"; // Eye icon for selected image
import { formatEnumString, getImageUrl } from "@/lib/utils";
import Typography from "@/components/atoms/Typography";
import { SingleEquipmentType } from "@/constants/types";
import Loader from "@/components/atoms/Loader";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Import styles for the lightbox
import { useRouter } from "next/navigation";

export default function EquipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [equipment, setEquipment] = useState<SingleEquipmentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // To track the current image index
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Track if lightbox is open
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLightboxLoading, setIsLightboxLoading] = useState(false); // Track loading state for the lightbox

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API}/equipment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEquipment(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    ); // Show loading animation

  if (!equipment) return <Typography>Equipment Not Found.</Typography>;

  const images = equipment.images;

  // Handling lightbox logic
  const openLightbox = (index: number) => {
    setIsLightboxOpen(true); // Open lightbox
    setLightboxIndex(index); // Set the image index
    setIsLightboxLoading(true); // Set the loading state for the lightbox
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false); // Close lightbox
  };

  const handleImageLoad = () => {
    setIsLightboxLoading(false); // Set loading to false once the image is loaded
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Main Image */}
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden cursor-pointer">
        <Image
          src={getImageUrl(images[currentIndex] || "")}
          alt="Selected Equipment"
          layout="fill"
          objectFit="cover"
          unoptimized={true}
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 p-2 rounded-full">
          <ChevronLeft
            className="text-white"
            size={24}
            onClick={() => router.back()} // Open lightbox when clicked
          />
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full">
          <Eye
            className="text-white"
            size={24}
            onClick={() => openLightbox(currentIndex)} // Open lightbox when clicked
          />
        </div>
      </div>

      {/* Small Image Thumbnails */}
      <div className="flex gap-4 mt-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${
              currentIndex === index ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setCurrentIndex(index)} // Set the selected image by index
          >
            <Image
              src={getImageUrl(img)}
              alt="Equipment Thumbnail"
              layout="fill"
              objectFit="cover"
              unoptimized={true}
            />
            {currentIndex === index && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Eye className="text-white" size={20} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Equipment Details */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <Typography variant="large" className="font-semibold text-gray-800">
          {formatEnumString(equipment.category)} -{" "}
          {formatEnumString(equipment.type)}
        </Typography>
        <Typography className="text-gray-600">
          {equipment.description}
        </Typography>

        <div className="mt-4 flex justify-between">
          <Typography className="text-xl font-bold text-primary">
            {equipment.price} Br
          </Typography>
          <Typography
            className={`px-3 py-1 rounded-full ${
              equipment.quantity > 0
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {equipment.quantity > 0
              ? `In Stock: ${equipment.quantity}`
              : "Out of Stock"}
          </Typography>
        </div>

        {/* Contact Info */}
        <div className="mt-6 p-4 flex flex-col gap-2 bg-white shadow rounded-lg">
          <Typography weight="800" color="var(--primary)" size={15}>
            Contact
          </Typography>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => {
              window.location.href = `tel:${equipment.phone}`;
            }}
          >
            <Phone className="text-orange" />
            <Typography className="text-orange" size={14}>
              {equipment.phone}
            </Typography>
          </div>
        </div>
      </div>

      {/* Lightbox for Image */}
      {isLightboxOpen && (
        <ReactImageLightbox
          mainSrc={getImageUrl(images[lightboxIndex] || "")}
          nextSrc={getImageUrl(
            images[(lightboxIndex + 1) % images.length] || ""
          )}
          prevSrc={getImageUrl(
            images[(lightboxIndex - 1 + images.length) % images.length] || ""
          )}
          onCloseRequest={closeLightbox} // Close the lightbox
          onMovePrevRequest={() =>
            setLightboxIndex(
              (prevIndex) => (prevIndex - 1 + images.length) % images.length
            )
          }
          onMoveNextRequest={() =>
            setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
          onImageLoad={() => handleImageLoad()} // Handle image load state
        />
      )}
    </div>
  );
}
