import LinkTo from '../LinkTo';
import { IArticleHeaderData } from '../../shared/interfaces';
import {
  combineClasses,
  transformImagePaths,
  transformPath,
} from '../../utils/utils';
import classes from './ArticleCard.module.scss';
import { motion } from 'framer-motion';
import Avatar from '../Misc/Avatar';
import ArticleCardCategory from '../Misc/ArticleCardCategory';
import ArticleTags from '../Misc/ArticleTags';
import Image from 'next/image';
import ArticleRating from '../Misc/ArticeRating';
import RatingModel from '../Rating';
import { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Modal, Rating, Typography } from '@mui/material';
import AdaptationPromptModel from '../adaptationPromptModel';
import { useCookies } from 'react-cookie';
import { publicRequest } from '../../../config/axiosRequest';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CopyIconComponent from '../CopyIconComponent';
import StarIcon from '@mui/icons-material/Star';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarBorderIcon from '@mui/icons-material/StarBorder';
interface IProp {
  article: any;
  path: string;
}

const ArticleCard = ({ article, path }: IProp) => {
  const [cookies, setCookie, removeCookie] = useCookies(['deviceId']);
  let router = useRouter();
  const [currentRate, setCurrentRate] = useState({
    rating: 0,
    id: '',
  });

  useEffect(() => {
    if (!cookies.deviceId) {
      setCookie('deviceId', Math.random().toString(36).substring(3), {
        path: '/',
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

  const handleClick = (event: any) => {
    router.push(`/prompt/${article._id}`);
  };
  function camelCaseToNormal(text) {
    // Use a regular expression to insert a space before all uppercase letters
    return (
      text
        .replace(/([A-Z])/g, ' $1')
        // Capitalize the first letter and remove leading spaces
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
        .trim()
    );
  }
  return (
    <motion.div
      className={'w-full lg:w-1/3 md:w-1/2 md:px-[15px] p-5 mb-[30px]'}
      layout
    >
      <div
        className={combineClasses(classes.article_card, 'rounded-[1rem] p-5')}
      >
        <div onClick={handleClick} className='cursor-pointer'>
          <div>
            <div className={'flex items-center justify-between'}></div>
            <Link href={`/prompt/${article._id}`}>
              <h1
                className={
                  'text-[18px] font-bold cursor-pointer tracking-wide text-orange-500'
                }
              >
                {article?.title}
              </h1>
            </Link>

            <p
              className={combineClasses(
                classes.article_card__intro,
                'text-sm font-normal mt-2 md:mt-1'
              )}
            >
              {article.article?.description?.length > 400
                ? article?.description?.slice(0, 400) + '...'
                : article?.description}
            </p>

            <div className={'flex items-center my-2'}>
              <Typography color='textPrimary'>
                {camelCaseToNormal(article?.category)}
              </Typography>
              <Typography color='textPrimary'>&nbsp;|&nbsp;</Typography>
              <Typography color='textPrimary'>
                {camelCaseToNormal(article?.subCategories)}
              </Typography>
            </div>
          </div>
        </div>
        <div
          className={combineClasses(
            classes.article_card_footer,
            'mt-4 mb-3 items-center px-3'
          )}
        >
          <div>
            <div className={'flex items-center'}>
              <Avatar
                author={article.author}
                className='w-[40px] h-[40px] mr-3 text-xl'
              />
              <LinkTo
                href={''}
                passHref
                className={combineClasses(
                  classes.author_name,
                  'text-sm font-medium'
                )}
              >
                {article.author?.userName} ({article?.author?.designation})
              </LinkTo>
            </div>

            <div className='flex items-start sm:items-center mt-5'>
              {[...Array(article.rating)].map((each: any, i) => {
                return <StarIcon className='text-yellow-500' key={i} />;
              })}
              <span className='text-[15px] leading-6 text-slate-700 mt-1'>
                &nbsp; {article.rating > 0 && `(${article?.ratecount})`}
              </span>
            </div>
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
    </motion.div>
  );
};

export default ArticleCard;
