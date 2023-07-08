import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ButtonPrimary from "../Misc/ButtonPrimary";
import { Breadcrumbs, IconButton, Rating, Typography } from "@mui/material";
import Avatar from "../Misc/Avatar";
import { combineClasses } from "../../utils/utils";
import LinkTo from "../LinkTo";
import classes from "../ArticleCards/ArticleCard.module.scss";
import ArticleTags from "../Misc/ArticleTags";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from '@mui/icons-material/Share';

const PromptTop = (props: any) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  console.log(props.prompt);
  const {
    _id,
    title,
    description,
    ratecount,
    rating,
    prompt,
    author,
    inputParams,
    category,
    subCategories,
  } = props.prompt;

  return (
    <div className="max-w-screen-xl mt-7 px-8 xl:px-16 mx-auto" id="about">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 mt-20 w-full">
        <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1 w-3/4 border-y-neutral-500 sm:border-none">
          <h1 className="text-2xl lg:text-3xl xl:text-3xl font-medium text-black-600 leading-normal">
            {title}
          </h1>
          <p className="text-black-500 mt-4">{description}</p>

          <div className={"flex items-center justify-center mt-2 mb-2"}>
            <Breadcrumbs maxItems={2}>
              <Typography color="textPrimary">{category}</Typography>
              <Typography color="textPrimary">{subCategories}</Typography>
            </Breadcrumbs>
          </div>
          <ArticleTags tags={inputParams} />

          <div className={"flex items-center justify-between mt-3"}>
            <div className={"flex items-center"}>
              <Avatar
                author={author}
                className="w-[40px] h-[40px] mr-3 text-xl"
              />
              <LinkTo
                href={""}
                passHref
                className={combineClasses(
                  classes.author_name,
                  "text-sm font-medium"
                )}
              >
                {author?.userName} ({author?.designation})
              </LinkTo>
            </div>
          </div>
          <div className="mt-3 flex flex-col items-start">
            <span className="flex items-center gap-4 text-sm rounded text-slate-500">
              <Rating
                style={{
                  fontSize: "2.5rem",
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

        <div className="flex w-full ">
          <div className="relative w-full mt-5 border-2 p-5 bg-slate-400 rounded-lg hover:border-black">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium text-black-600 leading-normal ">
              <strong>{prompt}</strong>.
            </h1>
            <div className="flex mt-2">
              <CopyToClipboard text={prompt}>
                <IconButton aria-label="delete">
                  <ContentCopyIcon />
                </IconButton>
              </CopyToClipboard>
              <CopyToClipboard text={`https://rating-app-fe-theta.vercel.app/prompt/${_id}`}>
                <IconButton aria-label="delete">
                  <ShareIcon />
                </IconButton>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative w-full mt-5 border-2 p-5 bg-slate-400 rounded-lg">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal ">
          <strong>{prompt}</strong>.
        </h1>
      </div> */}
    </div>
  );
};

export default PromptTop;
