import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

let MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <MotionLink
        href="/"
        className="flex items-center justify-center rounded-full w-[100px] h-[100px] text-white dark:border-1 dark:border-solid dark:border-dark"
      >
        <img
          src="/Nice.png"
          alt="Logo"
          className="w-full h-full object-contain rounded-full w-[100px] h-[100px] py-2 px-2"
        />
      </MotionLink>
    </div>
  );
};

export default Logo;
