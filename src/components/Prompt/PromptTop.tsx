import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import getScrollAnimation from '../../utils/getScrollAnimation';
import {
  Breadcrumbs,
  IconButton,
  Rating,
  Typography,
  TextareaAutosize,
} from '@mui/material';
import CodeBlock from '../CodeBlock';
import Avatar from '../Misc/Avatar';
import { combineClasses } from '../../utils/utils';
import LinkTo from '../LinkTo';
import classes from '../ArticleCards/ArticleCard.module.scss';
import ArticleTags from '../Misc/ArticleTags';
import { publicRequest } from '../../../config/axiosRequest';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import StarIcon from '@mui/icons-material/Star';
import CopyIconComponent from '../CopyIconComponent';
import ShareIconComponent from '../ShareIconComponent';
import Modal from '../Modal';

const PromptTop = (props: any) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [cookies, setCookie, removeCookie] = useCookies(['deviceId']);
  const [touched, setTouched] = useState<string[]>([]);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [comments, setComments] = useState([
    'This is a comment',
    'This is another comment',
  ]);
  const [newComment, setNewComment] = useState('');
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (commentSubmitted) {
      return;
    }
    if (newComment.trim() !== '') {
      //make api call
      setCommentSubmitted(true);
      setComments([newComment, ...comments]);
      setNewComment('');
    }
  };
  let router = useRouter();
  const [currentRate, setCurrentRate] = useState({
    rating: 0,
    id: '',
  });

  const [result, setResult] = useState('');

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
    setTouched([...touched, 'promptCreated']);
    const modifiedSentence = prompt.replace(
      regex,
      (match: any, word: any) => inputParamSet[word] || match
    );
    setResult(modifiedSentence);
  };
  console.log(touched);
  const getAllTouched = () => {
    return touched.length >= matches?.length + 1;
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
  const text = `Certainly! Here are some steps to lead a good life:

  1. Set meaningful goals: Define what matters most to you and set specific, achievable goals that align with your values and aspirations.
  
  2. Focus on personal growth: Develop a growth mindset and commit to continuous learning and self-improvement. Seek new experiences, acquire new skills, and challenge yourself regularly.
  
  3. Cultivate positive relationships: Surround yourself with supportive and nurturing individuals who uplift and inspire you. Foster strong connections through empathy, active listening, and maintaining open lines of communication.
  
  4. Take care of your physical health: Prioritize regular exercise, a balanced diet, and sufficient sleep. Incorporate healthy habits into your routine to boost your overall well-being.
  
  5. Practice self-care: Dedicate time to self-care activities that promote relaxation, stress reduction, and personal rejuvenation. This may include activities such as reading, meditating, pursuing hobbies, or engaging in creative outlets.
  
  6. Embrace gratitude: Cultivate an attitude of gratitude by reflecting on the positives in your life. Express appreciation for the people, experiences, and opportunities that bring you joy and fulfillment.
  
  7. Be mindful and present: Practice being fully present in each moment. Mindfulness exercises, such as meditation or deep breathing, can help you develop awareness, reduce stress, and enhance your overall mental well-being.
  
  8. Give back and show kindness: Engage in acts of kindness, volunteering, or donating to causes that resonate with you. Helping others not only benefits them but also promotes a sense of purpose and fulfillment in your own life.
  
  9. Manage your finances wisely: Cultivate responsible financial habits by creating a budget, saving for the future, and making informed decisions about expenses. Building a solid financial foundation can alleviate stress and provide a sense of security.
  
  10. Embrace optimism and resilience: Develop a positive mindset and resilience in the face of challenges. View difficulties as opportunities for growth and learning, and approach setbacks with determination and perseverance.
  
  \`\`\`html
  <!DOCTYPE html>
  <html>
  <head>
      <title>Text Box Example</title>
  </head>
  <body>
      <form>
          <label for="textbox">Enter your name:</label><br>
          <input type="text" id="textbox" name="name"><br><br>
          <input type="submit" value="Submit">
      </form>
  </body>
  </html>
  \`\`\`
  
  Remember, leading a good life is a deeply personal journey, and it's essential to define your own path based on what brings you joy, fulfillment, and a sense of purpose.`;
  function formatCodeBlocksAndText(text: string) {
    // Define a regular expression to match code blocks
    const codeBlockRegex = /```(\w+)([\s\S]+?)```/g;

    // Split the text into code blocks and regular text
    const segments = text.split(codeBlockRegex);
    // Process segments and create React elements
    const formattedContent = segments.map((segment, index) => {
      if (index % 3 === 0) {
        // Regular text segment
        var outputString = segment.replace(/\n/g, '<br/>');
        return (
          <p key={index}>
            <div dangerouslySetInnerHTML={{ __html: outputString }} />
          </p>
        );
      } else if (index % 3 === 1) {
        // Opening code block
        const language = segment.trim();
      } else {
        // Code content segment
        return (
          <CodeBlock
            key={index + 2}
            language={segments[index - 1].trim()}
            narrow
          >
            {segment}
          </CodeBlock>
        );
      }
    });
    console.log(formattedContent);
    return formattedContent;
  }

  return (
    <div className='max-w-screen-xl mt-0 px-8 xl:px-16 mx-auto ' id='about'>
      <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 mt-20 w-full'>
        <div className='flex flex-col justify-center items-start row-start-2 sm:row-start-1 w-full lg:w-3/4   border-y-neutral-500 sm:border-none'>
          <h1 className='text-lg lg:text-[1.5rem] font-lg text-black-600 leading-normal '>
            Customize for Yourself!
          </h1>
          <div className='flex flex-col  justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 w-full'>
            <div className='mt-6 w-full'>
              <label
                className='block mb-4 text-sm font-bold text-gray-700'
                htmlFor='authorName'
              >
                Input Params
              </label>
              <div className='flex flex-col'>
                {matches?.length > 0 &&
                  matches.map((match: any, i: number) => (
                    <div key={i}>
                      <label
                        className='block m-1 text-sm font-bold text-gray-700'
                        htmlFor='authorName'
                      >
                        {match.slice(1, -1)}
                      </label>
                      <input
                        className='px-4 w-full sm:w-1/2 mb-2 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                        id={match.slice(1, -1)}
                        type='text'
                        name={match.slice(1, -1)}
                        placeholder={match}
                        onChange={(e) => {
                          if (!touched.includes(match.slice(1, -1)))
                            setTouched([...touched, match.slice(1, -1)]);
                          setInputParamSet(
                            Object.assign({}, inputParamSet, {
                              [match.slice(1, -1)]: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>
                  ))}

                <button
                  className='px-4 w-full sm:w-1/2 mt-3 py-2 text-sm leading-tight text-wh border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-orange-500'
                  onClick={handleCreatePrompt}
                >
                  Create Prompt
                </button>
              </div>

              <div className='flex-col w-full'>
                <div className=' w-full mt-5  border-2 p-5 bg-slate-300  rounded-lg hover:border-black'>
                  <h1 className='text-xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal'>
                    {result && <strong>{result}</strong>}
                  </h1>
                  <div className='flex mt-2'>
                    <CopyIconComponent text={result} />
                  </div>
                </div>

                {/* <button
                    className="px-4 w-full  mt-3 py-2 text-sm leading-tight text-wh border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-orange-500"
                    onClick={handleCreatePrompt}
                  >
                    Try This Prompt on ChatGPT
                  </button> */}
              </div>
            </div>

            <div className='w-full'></div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 mt-20 w-full'>
          <div className='flex flex-col justify-center items-start row-start-2 sm:row-start-1  border-y-neutral-500 sm:border-none'>
            <p className={'font-normal text-xs pt-3 mb-0 md:mb-3'}>
              Updated on : {createdAt?.slice(0, 10)}
            </p>

            <ArticleTags tags={inputParams} />

            <div
              className={
                'flex items-center justify-between mt-3 flex-col sm:flex-row'
              }
            >
              <div className={'flex items-center'}>
                <Avatar
                  author={author}
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
                  {author?.userName} ({author?.designation})
                </LinkTo>
              </div>
              <div className='flex items-start sm:items-center ml-10'>
                <StarIcon className='text-yellow-500' />
                <span className='text-[15px] leading-6 text-slate-700 mt-1'>
                  {rating} ({ratecount})
                </span>
              </div>
            </div>
            {/* <div className="mt-3 flex flex-col items-start">
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
            </div> */}
            <div className={'flex items-center justify-center mt-2 mb-2'}>
              <Breadcrumbs maxItems={2}>
                <Typography color='textPrimary'>{category}</Typography>
                <Typography color='textPrimary'>{subCategories}</Typography>
              </Breadcrumbs>
            </div>
            <h1 className='text-xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal'>
              {title}
            </h1>
            <p className='text-black-500 mt-4'>{description}</p>

            <div className='relative w-full mt-5 border-2 p-5 bg-slate-300 rounded-lg hover:border-black'>
              <h1 className='text-xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal '>
                <strong>{prompt}</strong>.
              </h1>
              <div className='flex mt-2'>
                <CopyIconComponent text={prompt} />
                {/* <CopyToClipboard
                  text={`${process.env.NEXT_PUBLIC_PROMPT_URL}${_id}`}
                >
                  <IconButton aria-label="delete">
                    <ShareIcon />
                  </IconButton>

                </CopyToClipboard> */}
                <div className='ml-2'></div>
                <ShareIconComponent
                  text={`${process.env.NEXT_PUBLIC_PROMPT_URL}${_id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {checkIfRated(ratingList) ? (
        <div className='m-4 ml-4'>
          <p className='text-[11px] text-red-500 text-lg'>
            You have already rated this prompt
          </p>
        </div>
      ) : getAllTouched() ? (
        <div className='max-w-lg mt-4 ml-4'>
          <p className='text-[20px] text-grey-500 mb-1'>Rate this Prompt</p>
          <Rating
            size='large'
            name='size-large'
            defaultValue={0}
            value={currentRate.id === _id ? currentRate.rating : 0}
            onChange={(event, newValue) => {
              handleRate(newValue);
            }}
            readOnly={currentRate.rating !== 0 && currentRate.id === _id}
          />
          <div className='mt-4'>
            <TextareaAutosize
              className='px-4  mb-2 py-2 text-sm leading-tight text-gray-700  shadow appearance-none focus:outline-none focus:shadow-outline w-full border border-gray-300 rounded-md'
              placeholder='Add a comment...'
              value={newComment}
              onChange={handleCommentChange}
              minRows={3}
            />
          </div>

          <div className='mt-2'>
            <button
              className='px-4 w-full sm:w-1/2 mt-3 py-2 text-sm leading-tight text-wh border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-orange-500'
              onClick={handleSubmitComment}
            >
              Post Comment
            </button>
          </div>
        </div>
      ) : null}
      <div className='max-w-lg p-4'>
        <br />
        <h2 className='text-2xl font-semibold mb-4'>Comments</h2>

        <div className='space-y-4'>
          {comments.map((comment, index) => (
            <div key={index} className='bg-white p-4 rounded-lg w-full'>
              {comment}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="relative w-full mt-5 border-2 p-5 bg-slate-400 rounded-lg">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal ">
          <strong>{prompt}</strong>.
        </h1>
      </div> */}
      <Modal open={true} fullHeight={false} closeModal={() => {}}>
        <div className='relative mt-5 p-5 max-w-[50vw]'>
          <h2 className='text-3xl lg:text-xl font-medium text-black-600 leading-normal '>
            <strong>{prompt}</strong>.
          </h2>
          <div className='text-left'>{formatCodeBlocksAndText(text)}</div>
        </div>
      </Modal>
    </div>
  );
};

export default PromptTop;
