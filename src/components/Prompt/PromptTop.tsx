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
  const [promptModal, setPromptModal] = useState(false);
  const [promptResponseLoading, setPromptResponseLoading] = useState(true);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [comments, setComments] = useState([
    'This is a comment',
    'This is another comment',
  ]);
  const [newComment, setNewComment] = useState('');
  const [promptResponse, setPromptResponse] = useState<string>();
  const [error, setError] = useState(false);
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
    if (touched.length < matches?.length) {
      setError(true);
      return;
    }
    setError(false);
    setPromptModal(true);
    getPromptResponse();
    setTouched([...touched, 'promptCreated']);
    const modifiedSentence = prompt.replace(
      regex,
      (match: any, word: any) => inputParamSet[word] || match
    );
    setResult(modifiedSentence);
  };

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

  function formatCodeBlocksAndText(text?: string) {
    if (!text) return;
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
          <CodeBlock key={index + 2} language={segments[index - 1].trim()}>
            {segment}
          </CodeBlock>
        );
      }
    });
    return formattedContent;
  }

  async function getPromptResponse() {
    setPromptResponseLoading(true);
    //delay of 3 seconds
    await new Promise((r) => setTimeout(r, 3000));
    setPromptResponse(`Certainly! Here's a code snippet in Java to find the sum of 10 numbers:

    \`\`\`java
    import java.util.Scanner;
    
    public class SumOfNumbers {
        public static void main(String[] args) {
            int sum = 0;
            Scanner scanner = new Scanner(System.in);
    
            System.out.println("Enter 10 numbers:");
            for (int i = 0; i < 10; i++) {
                System.out.print("Number " + (i+1) + ": ");
                int number = scanner.nextInt();
                sum += number;
            }
    
            System.out.println("Sum of the numbers is: " + sum);
        }
    }
    \`\`\`
    
    In this code, we use a for loop to iterate 10 times and prompt the user to enter a number in each iteration. The numbers are then added to the \`sum\` variable. Finally, the sum is printed to the console.
    
    
    Certainly! Here's the code snippet modified to generate HTML code to display the output:
    
    \`\`\`java
    import java.util.Scanner;
    
    public class SumOfNumbers {
        public static void main(String[] args) {
            int sum = 0;
            Scanner scanner = new Scanner(System.in);
    
            System.out.println("Enter 10 numbers:");
            for (int i = 0; i < 10; i++) {
                System.out.print("Number " + (i+1) + ": ");
                int number = scanner.nextInt();
                sum += number;
            }
    
            String htmlCode = "<html>\n" +
                    "<head>\n" +
                    "<title>Sum of Numbers</title>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "<h1>Sum of the 10 numbers is:</h1>\n" +
                    "<p>" + sum + "</p>\n" +
                    "</body>\n" +
                    "</html>";
                    
            System.out.println(htmlCode);
        }
    }
    \`\`\`
    
    This code will generate an HTML code string that displays the sum of the 10 numbers as the output. You can copy the generated HTML code and place it in an HTML file or use it in your desired context.`);
    //make api call here
    setPromptResponseLoading(false);
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
                {error && (
                  <span className='text-red-500 py-2'>
                    Please fill all the details
                  </span>
                )}
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
      <Modal
        open={promptModal}
        fullHeight={false}
        closeModal={() => setPromptModal(false)}
      >
        <div className='relative mt-5 p-5 max-w-[50vw]'>
          <h2 className='text-3xl lg:text-xl font-medium text-black-600 leading-normal '>
            <strong>{prompt}</strong>.
          </h2>
          <br />
          <div className='text-left'>
            {promptResponseLoading ? (
              <div className='grid justify-center items-center h-[50vh] w-full'>
                <div
                  className=' rounded-full h-32 w-32 justify-self-center'
                  style={{ animation: 'spin 4s linear infinite' }}
                >
                  <Image
                    src='/assets/gpt-loading.svg'
                    alt='Loading'
                    objectFit='contain'
                    width={100}
                    height={100}
                    layout='responsive'
                  />
                </div>
              </div>
            ) : (
              formatCodeBlocksAndText(promptResponse)
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PromptTop;
