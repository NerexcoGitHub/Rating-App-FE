import { MouseEventHandler } from "react";
import { IArticleHeaderData } from "../../shared/interfaces";

const AdaptationPromptModel = (props: {
  handleClosePromtModel: () => void;
  article: IArticleHeaderData;
}) => {
  return (
    <div className="fixed py-3 sm:max-w-xl sm:mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div className="flex">
            <h1 className="text-2xl font-semibold">{props.article.prompt}</h1>
            <button
              onClick={props.handleClosePromtModel}
              type="button"
              className="w-10 h-10 bg-red-500 hover:bg-red-400 rounded-md p-2 ml-2 inline-flex items-center justify-center text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input
                  autoComplete="off"
                  id="authorName"
                  name="authorName"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Author Name"
                />
                <label
                  htmlFor="authorName"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Author Name
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="designation"
                  name="designation"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Designation"
                />
                <label
                  htmlFor="designation"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Designation
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="keyWords"
                  name="keyWords"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Key Words (separated by commas)"
                />
                <label
                  htmlFor="keyWords"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Key Words
                </label>
              </div>
              <div className="relative">
                <button className="bg-orange-500 hover:bg-orange-700 text-white rounded-md px-2 py-1">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptationPromptModel;
