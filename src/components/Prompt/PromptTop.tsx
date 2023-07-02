import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ButtonPrimary from "../Misc/ButtonPrimary";
import { Rating } from "@mui/material";

const PromptTop = (props: any) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const { title, description, ratecount, rating, prompt } = props.prompt;

  return (
    <div className="max-w-screen-xl mt-7 px-8 xl:px-16 mx-auto" id="about">
      <motion.div
        className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 mt-20"
        variants={scrollAnimation}
      >
        <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
          <h1 className="text-2xl lg:text-3xl xl:text-3xl font-medium text-black-600 leading-normal">
            {title}
          </h1>
          <p className="text-black-500 mt-4 mb-6">{description}</p>

          <div className="mb-1 flex flex-col items-start pl-5">
            <span className="flex items-center gap-4 text-sm rounded text-slate-500">
              <Rating
                style={{
                  fontSize: "3.5rem",
                }}
                name="read-only"
                value={parseInt(rating)}
                readOnly
              />
              <span className="text-[15px]">{rating} out 5</span>
            </span>

            <span className="text-[15px] leading-6 text-slate-400 mt-1">
              based on {ratecount} user ratings
            </span>
          </div>
        </div>

        <div className="flex w-full">
          <motion.div className="h-full w-full" variants={scrollAnimation}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/busticketsbooking-3f54c.appspot.com/o/tenor.gif?alt=media&token=c9a0a7c3-f2b1-4cce-a691-f946d35833c5"
              alt="VPN Illustrasi"
              objectFit="contain"
              quality={100}
              width={612}
              height={209}
              layout="responsive"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="relative w-full mt-5 border-2 p-5 bg-slate-400 rounded-lg">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal ">
          <strong>{prompt}</strong>.
        </h1>
      </div>
    </div>
  );
};

export default PromptTop;
