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
import { useEffect, useState } from "react";
import { Modal, Rating } from "@mui/material";
import AdaptationPromptModel from "../adaptationPromptModel";
import { useCookies } from "react-cookie";
import { publicRequest } from "../../../config/axiosRequest";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface IProp {
  article: any;
  path: string;
}

const ArticleCard = ({ article, path }: IProp) => {
  const [openPromtModel, setOpenPromtModel] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["deviceId"]);
  const [currentRate, setCurrentRate] = useState({
    rating: 0,
    id: "",
  });
  const [copyState, setCopyState] = useState(false);

  const handleOpenPromtModel = () => {
    setOpenPromtModel(!openPromtModel);
  };

  useEffect(() => {
    if (!cookies.deviceId) {
      setCookie("deviceId", Math.random().toString(36).substring(3), {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
      });
    }
  }, []);

  const handleRate = async (value: number | null) => {
    setCurrentRate({
      rating: value as number,
      id: article._id,
    });
    await publicRequest
      .post(`/user/rate-prompt`, {
        promptId: article._id,
        rating: value,
        deviceId: cookies.deviceId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkIfRated = (list: string) => {
    if (list.includes(cookies.deviceId)) {
      return true;
    } else {
      return false;
    }
  };

  // set url and path
  // const origin =
  //   typeof window !== "undefined" && window.location.origin
  //     ? window.location.origin
  //     : "";

  // const imgLoader = ({ src, width, quality }: any) => {
  //   return `${origin}${src}?w=${width}&q=${quality || 75}`;
  // };

  return (
    <div className={"w-full lg:w-1/3 md:w-1/2 md:px-[15px] px-2 mb-[30px] "}>
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
            <div className={"flex items-center justify-between"}>
              <p className={"font-normal text-xs pt-3 mb-0 md:mb-3"}>
                {article?.createdAt?.slice(0, 10)}
              </p>
              <CopyToClipboard  text={article?.prompt} onCopy={() => setCopyState(true)}>
                {
                  copyState ? <CheckCircleOutlineIcon className='text-green-500 '/> : <ContentCopyIcon className='hover:text-slate-400'/>

                }
              </CopyToClipboard>
            </div>

            <h1
              className={
                "text-[18px] font-bold cursor-pointer tracking-wide text-blue-600"
              }
            >
              {article?.title}
            </h1>

            <p
              className={combineClasses(
                classes.article_card__intro,
                "text-sm font-normal mt-2 md:mt-1"
              )}
            >
              {article?.description?.slice(0, 100)} ...
            </p>

            {/* <h1
              className={"text-[22px] font-bold cursor-pointer tracking-wide "}
            >
              {article?.prompt?.slice(0, 100)}
            </h1> */}
            <ArticleTags tags={article.inputParams} />
          </div>
        </div>
        <ArticleRating
          rating={article?.rating}
          count={article?.ratecount}
          sum={article?.ratesum}
          usercount={article?.ratingList?.length || 0}
        />
        {checkIfRated(article?.ratingList) ? (
          <div className="m-4">
            <p className="text-[11px] text-red-500">
              You have already rated this prompt
            </p>
          </div>
        ) : (
          <div className="pl-5">
            <p className="text-[15px] text-grey-500">Rate this Prompt</p>
            <Rating
              size="large"
              name="size-large"
              defaultValue={0}
              value={currentRate.id === article._id ? currentRate.rating : 0}
              onChange={(event, newValue) => {
                handleRate(newValue);
              }}
              readOnly={
                currentRate.rating !== 0 && currentRate.id === article._id
              }
            />
          </div>
        )}
        <div
          className={combineClasses(
            classes.article_card_footer,
            "mt-4 mb-3 items-center px-3"
          )}
        >
          <div className={"flex items-center"}>
            <Avatar
              author={article.author}
              className="w-[40px] h-[40px] mr-3 text-xl"
            />
            <LinkTo
              href={"/blog?author=" + article.author.userName}
              passHref
              className={combineClasses(
                classes.author_name,
                "text-sm font-medium"
              )}
            >
              {article.author.userName} ({article?.author?.designation})
            </LinkTo>
          </div>
        </div>
      </div>

      {/* <Modal
        open={openPromtModel}
        onClose={handleOpenPromtModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AdaptationPromptModel
          handleClosePromtModel={handleOpenPromtModel}
          article={article}
        />
      </Modal> */}
    </div>
  );
};

export default ArticleCard;
