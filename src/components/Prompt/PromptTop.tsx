import React, { useMemo, useState } from "react";
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
import ShareIcon from "@mui/icons-material/Share";
import { publicRequest } from "../../../config/axiosRequest";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const PromptTop = (props: any) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [cookies, setCookie, removeCookie] = useCookies(["deviceId"]);
  let router = useRouter();
  const [currentRate, setCurrentRate] = useState({
    rating: 0,
    id: "",
  });

  const [result, setResult] = useState("");

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
    createdAt,
    ratingList,
  } = props.prompt;

  const [inputParamSet, setInputParamSet] = useState([]);
  if (!prompt) return null;
  const regex = /{([^}]+)}/g;
  const matches = prompt.match(regex);

  const handleCreatePrompt = async () => {
    const modifiedSentence = prompt.replace(
      regex,
      (match: any, word: any) => inputParams[word] || match
    );
    setResult(modifiedSentence);
  };
  const handleRate = async (value: number | null) => {
    setCurrentRate({
      rating: value as number,
      id: _id,
    });
    await publicRequest
      .post(`/user/rate-prompt`, {
        promptId: _id,
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
    if (list?.includes(cookies.deviceId)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="max-w-screen-xl mt-0 px-8 xl:px-16 mx-auto " id="about" >
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 mt-20 w-full">
        <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1 sm:w-3/4   border-y-neutral-500 sm:border-none">
          {checkIfRated(ratingList) ? (
            <div className="m-4">
              <p className="text-[11px] text-red-500">
                You have already rated this prompt
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-[15px] text-grey-500">Rate this Prompt</p>
              <Rating
                size="large"
                name="size-large"
                defaultValue={0}
                value={currentRate.id === _id ? currentRate.rating : 0}
                onChange={(event, newValue) => {
                  handleRate(newValue);
                }}
                readOnly={currentRate.rating !== 0 && currentRate.id === _id}
              />
            </div>
          )}

          <h1 className="text-xl lg:text-xl xl:text-xl font-medium text-black-600 leading-normal ">
            Customize for Yourself!
          </h1>
          <div className="flex flex-col  justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 w-full">
            <div className="mt-6 w-full">
              <label
                className="block mb-4 text-sm font-bold text-gray-700"
                htmlFor="authorName"
              >
                Input Params
              </label>
              <div className="flex flex-col">
                {matches?.length > 0 &&
                  matches.map((match: any) => (
                    <>
                      <label
                        className="block m-1 text-sm font-bold text-gray-700"
                        htmlFor="authorName"
                      >
                        {match.slice(1, -1)}
                      </label>
                      <input
                        className="px-4 w-full sm:w-1/2 mb-2 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id={match.slice(1, -1)}
                        type="text"
                        name={match.slice(1, -1)}
                        placeholder={match}
                        onChange={(e) =>
                          setInputParamSet(
                            Object.assign({}, inputParams, {
                              [match.slice(1, -1)]: e.target.value,
                            })
                          )
                        }
                      />
                    </>
                  ))}

                <button
                  className="px-4 w-full sm:w-1/2 mt-3 py-2 text-sm leading-tight text-wh border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-orange-500"
                  onClick={handleCreatePrompt}
                >
                  Create Prompt
                </button>
              </div>
     
                <div className="flex-col w-full">
                  <div className=" w-full mt-5  border-2 p-5 bg-slate-300  rounded-lg hover:border-black">
                    <h1 className="text-xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                      {result && <strong>{result}</strong>}
                    </h1>
                    <div className="flex mt-2">
                      <CopyToClipboard text={result}>
                        <IconButton aria-label="delete">
                          <ContentCopyIcon />
                        </IconButton>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <button
                    className="px-4 w-full  mt-3 py-2 text-sm leading-tight text-wh border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-orange-500"
                    onClick={handleCreatePrompt}
                  >
                    Try This Prompt on ChatGPT
                  </button>
                </div>
              
            </div>

            <div className="w-full"></div>
          </div>
        </div>

        <div className="flex w-full ">
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1  border-y-neutral-500 sm:border-none">
            <p className={"font-normal text-xs pt-3 mb-0 md:mb-3"}>
              Updated on : {createdAt?.slice(0, 10)}
            </p>

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
                    fontSize: "1.5rem",
                  }}
                  name="read-only"
                  value={parseInt(rating)}
                  readOnly
                />
                <span className="text-[15px]">{rating} out 5</span>
              </span>

              <span className="text-[12px] leading-6 text-slate-400 mt-1">
                based on {ratecount} user ratings
              </span>
            </div>
            <div className={"flex items-center justify-center mt-2 mb-2"}>
              <Breadcrumbs maxItems={2}>
                <Typography color="textPrimary">{category}</Typography>
                <Typography color="textPrimary">{subCategories}</Typography>
              </Breadcrumbs>
            </div>
            <h1 className="text-xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
              {title}
            </h1>
            <p className="text-black-500 mt-4">{description}</p>

            <div className="relative w-full mt-5 border-2 p-5 bg-slate-400 rounded-lg hover:border-black">
              <h1 className="text-xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal ">
                <strong>{prompt}</strong>.
              </h1>
              <div className="flex mt-2">
                <CopyToClipboard text={prompt}>
                  <IconButton aria-label="delete">
                    <ContentCopyIcon />
                  </IconButton>
                </CopyToClipboard>
                <CopyToClipboard
                  text={`https://rating-app-fe-theta.vercel.app/prompt/${_id}`}
                >
                  <IconButton aria-label="delete">
                    <ShareIcon />
                  </IconButton>
                </CopyToClipboard>
              </div>
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
