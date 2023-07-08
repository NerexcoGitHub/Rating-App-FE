import { Button, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

const PromptAction = (props: any) => {
  const { title, description, ratecount, rating, prompt } = props.prompt;
  const [inputParams, setInputParams] = useState([]);
  const [result, setResult] = useState("");

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

  return (
    <div className="max-w-screen-xl mt-16 px-8 xl:px-16 mx-auto" id="about">
      <div className="relative w-full mt-5">
        <h1 className="text-xl lg:text-xl xl:text-xl font-medium text-black-600 leading-normal ">
          Create Your Own Prompt!
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-8 space-y-8 lg:space-y-0 w-full">
          <div className="mt-6 w-3/4 ">
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
                        setInputParams(
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
          </div>

          <div className="flex w-full">
            {result && (
              <div className="flex-col">
                <div className="relative w-full mt-5  border-2 p-5 bg-slate-300  rounded-lg hover:border-black">
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl font-medium text-black-600 leading-normal">
                    <strong>{result}</strong>.
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptAction;
