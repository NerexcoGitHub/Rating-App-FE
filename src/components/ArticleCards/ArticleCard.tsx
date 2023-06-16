import LinkTo from "../LinkTo";
import { IArticleHeaderData } from "../../shared/interfaces";
import {
  combineClasses,
  transformImagePaths,
  transformPath,
} from "../../utils/utils";
import classes from "./ArticleCard.module.scss";
import Avatar from "../Misc/Avatar";
import ArticleCardCategory from "../Misc/ArticleCardCategory";
import ArticleTags from "../Misc/ArticleTags";
import Image from "next/image";
import ArticleRating from "../Misc/ArticeRating";
import RatingModel from "../Rating";
import { useState } from "react";
import { Modal, Rating } from "@mui/material";
import AdaptationPromptModel from "../adaptationPromptModel";

interface IProp {
  article: IArticleHeaderData;
  path: string;
}

const ArticleCard = ({ article, path }: IProp) => {
  const [openPromtModel, setOpenPromtModel] = useState(false);
  const handleOpenPromtModel = () => {
    console.log("open promt model");
    setOpenPromtModel(!openPromtModel);
  };

  // set url and path
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const imgLoader = ({ src, width, quality }: any) => {
    return `${origin}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className={"w-full lg:w-1/3 md:w-1/2 md:px-[15px] px-2 mb-[30px]"}>
      <div
        className={combineClasses(
          classes.article_card,
          "border-b-[5px] border-blue-500 dark:bg-slate-800 dark:text-white dark:drop-shadow-lg flex flex-col justify-between"
        )}
      >
        <div onClick={handleOpenPromtModel}>
          {/* <div className={"rounded-t-[4px] overflow-hidden h-[200px] relative"}>
            <Image
              src={transformImagePaths(article.thumbnail)}
              alt={article.articleTitle}
              layout="fill"
              quality={100}
              objectFit="cover"
              loader={imgLoader}
            />
          </div> */}

          <div className={"d-block px-[15px] py-0"}>
            <p className={"font-normal text-xs pt-3 mb-0 md:mb-3"}>
              {article.date}
            </p>

            <h1
              className={
                "text-[18px] font-bold cursor-pointer tracking-wide text-blue-600"
              }
            >
              {article.articleTitle}
            </h1>

            <p
              className={combineClasses(
                classes.article_card__intro,
                "text-sm font-normal mt-2 md:mt-1"
              )}
            >
              {article.shortIntro.slice(0, 100)} ...
            </p>

            <h1
              className={"text-[22px] font-bold cursor-pointer tracking-wide "}
            >
              {article?.prompt?.slice(0, 100)}
            </h1>
            <ArticleTags tags={article.tags} />
          </div>
        </div>
        <ArticleRating />
        <div
          className={combineClasses(
            classes.article_card_footer,
            "mt-4 mb-3 items-center px-3"
          )}
        >
          <p className="text-[15px] text-grey-500">rate us</p>
          <Rating name="size-large" defaultValue={2} />
          <div className={"flex items-center"}>
            <Avatar
              author={article.author}
              className="w-[40px] h-[40px] mr-3 text-xl"
            />
            <LinkTo
              href={"/blog?author=" + article.author.name}
              passHref
              className={combineClasses(
                classes.author_name,
                "text-sm font-medium"
              )}
            >
              {article.author.name} (Designation)
            </LinkTo>
     
          </div>
        </div>
      </div>

      <Modal
        open={openPromtModel}
        onClose={handleOpenPromtModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AdaptationPromptModel
          handleClosePromtModel={handleOpenPromtModel}
          article={article}
        />
      </Modal>
    </div>
  );
};

export default ArticleCard;
