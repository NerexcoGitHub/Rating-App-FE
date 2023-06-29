import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ButtonPrimary from "../Misc/ButtonPrimary";
import { Rating } from "@mui/material";

const PromptTop = ({}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="max-w-screen-xl mt-7 px-8 xl:px-16 mx-auto" id="about">
      <motion.div
        className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 mt-20"
        variants={scrollAnimation}
      >
        <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
          <h1 className="text-2xl lg:text-3xl xl:text-3xl font-medium text-black-600 leading-normal">
            Title of the Prompt
          </h1>
          <p className="text-black-500 mt-4 mb-6">
            Complete tasks in minutes that used to take hours with our growing
            library of marketing, sales, operations, productivity, and customer
            support prompts.
          </p>

          <div className="mb-1 flex flex-col items-start pl-5">
            <span className="flex items-center gap-4 text-sm rounded text-slate-500">
              <Rating style={{
                fontSize: "3.5rem",
              }} name="read-only" value={3} readOnly />
              <span className="text-[15px]">2 out 5</span>
            </span>

            <span className="text-[15px] leading-6 text-slate-400 mt-1">
              based on 4 user ratings
            </span>
          </div>
        </div>

        <div className="flex w-full">
          <motion.div className="h-full w-full" variants={scrollAnimation}>
            <Image
              src="../assets/tenor.gif"
              alt="VPN Illustrasi"
              objectFit="contain"
              quality={100}
              width={612}
              height={309}
              layout="responsive"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="relative w-full mt-5 border-2 p-5 bg-slate-400 rounded-lg">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal ">
          <strong>
            {" "}
            Solve Your Small Business Problems with 1-Click Prompts
          </strong>
          .
        </h1>
      </div>
    </div>
  );
};

export default PromptTop;
