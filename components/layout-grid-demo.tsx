"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import photos from "../utils/photos";

const SkeletonOne = ({ photo }: { photo: any }) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {photo.title}
      </p>
      <p className="font-normal text-base text-white">{photo.category}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {photo.description}
      </p>
    </div>
  );
};

const SkeletonTwo = ({ photo }: { photo: any }) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {photo.title}
      </p>
      <p className="font-normal text-base text-white">{photo.category}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {photo.description}
      </p>
    </div>
  );
};

const SkeletonThree = ({ photo }: { photo: any }) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {photo.title}
      </p>
      <p className="font-normal text-base text-white">{photo.category}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {photo.description}
      </p>
    </div>
  );
};

const SkeletonFour = ({ photo }: { photo: any }) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {photo.title}
      </p>
      <p className="font-normal text-base text-white">{photo.category}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {photo.description}
      </p>
    </div>
  );
};

export default function LayoutGridDemo() {
  const [selectedPhotos, setSelectedPhotos] = useState<any[]>([]);

  useEffect(() => {
    // Separate photos by orientation
    const horizontalPhotos = photos.filter(photo => photo.width > photo.height);
    const verticalPhotos = photos.filter(photo => photo.width <= photo.height);

    // Randomly decide layout: either 2 horizontal + 2 vertical OR 4 vertical
    const useHorizontalLayout = Math.random() > 0.5 && horizontalPhotos.length >= 2;

    let selectedSet: any[] = [];

    if (useHorizontalLayout && horizontalPhotos.length >= 2) {
      // Get 2 random horizontal photos for the wide slots (positions 0 and 3)
      const shuffledHorizontal = [...horizontalPhotos].sort(() => Math.random() - 0.5);
      const shuffledVertical = [...verticalPhotos].sort(() => Math.random() - 0.5);

      selectedSet = [
        shuffledHorizontal[0], // position 0 - wide slot (horizontal)
        shuffledVertical[0] || shuffledHorizontal[2], // position 1 - narrow slot (prefer vertical)
        shuffledVertical[1] || shuffledHorizontal[3], // position 2 - narrow slot (prefer vertical)
        shuffledHorizontal[1], // position 3 - wide slot (horizontal)
      ];
    } else {
      // Use 4 vertical photos for consistent layout
      const shuffledVertical = [...verticalPhotos].sort(() => Math.random() - 0.5);
      selectedSet = shuffledVertical.slice(0, 4);
    }

    setSelectedPhotos(selectedSet);
  }, []);

  if (selectedPhotos.length === 0) {
    return <div className="h-screen py-20 w-full"></div>; // Loading state
  }

  const cards = [
    {
      id: 1,
      content: <SkeletonOne photo={selectedPhotos[0]} />,
      className: "md:col-span-2",
      thumbnail: selectedPhotos[0]?.image || "",
      orientation: (selectedPhotos[0]?.width > selectedPhotos[0]?.height ? 'horizontal' : 'vertical') as 'horizontal' | 'vertical',
    },
    {
      id: 2,
      content: <SkeletonTwo photo={selectedPhotos[1]} />,
      className: "col-span-1",
      thumbnail: selectedPhotos[1]?.image || "",
      orientation: (selectedPhotos[1]?.width > selectedPhotos[1]?.height ? 'horizontal' : 'vertical') as 'horizontal' | 'vertical',
    },
    {
      id: 3,
      content: <SkeletonThree photo={selectedPhotos[2]} />,
      className: "col-span-1",
      thumbnail: selectedPhotos[2]?.image || "",
      orientation: (selectedPhotos[2]?.width > selectedPhotos[2]?.height ? 'horizontal' : 'vertical') as 'horizontal' | 'vertical',
    },
    {
      id: 4,
      content: <SkeletonFour photo={selectedPhotos[3]} />,
      className: "md:col-span-2",
      thumbnail: selectedPhotos[3]?.image || "",
      orientation: (selectedPhotos[3]?.width > selectedPhotos[3]?.height ? 'horizontal' : 'vertical') as 'horizontal' | 'vertical',
    },
  ];

  return (
    <div className="h-screen w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}