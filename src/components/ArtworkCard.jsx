import React from 'react';
import { motion } from 'motion/react';

export default function ArtworkCard({ artwork }) {
  return (
    <motion.div
      layout
      className="relative w-full aspect-square bg-[#15171E] group cursor-pointer overflow-hidden"
    >
      <img
        src={artwork.image}
        alt={artwork.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h4 className="text-white text-[12px] lg:text-[13px] font-bold truncate drop-shadow-md">
          {artwork.title}
        </h4>
        <p className="text-[#A0A4AB] text-[10px] lg:text-[11px] font-medium truncate drop-shadow-md">
          {artwork.artist.name}
        </p>
      </div>
    </motion.div>
  );
}
