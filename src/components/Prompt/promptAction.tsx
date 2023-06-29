import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChatIcon from '@mui/icons-material/Chat';

const PromptAction = () => {
  return (
    <div className="max-w-screen-xl mt-16 px-8 xl:px-16 mx-auto" id="about">
      <div className="relative w-full mt-5">
        <h1 className="text-xl lg:text-xl xl:text-xl font-medium text-black-600 leading-normal ">
          Create Your Own Prompt!
        </h1>
        <div className="mt-6 ">
          <label
            className="block mb-4 text-sm font-bold text-gray-700"
            htmlFor="authorName"
          >
            Input Params
          </label>
          <div className="flex flex-col">
            <input
              className="px-4 w-full sm:w-1/2 mt-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="AuthorName"
              type="text"
              name="author"
              placeholder="Author Name"
            />
            <input
              className="px-4 w-full sm:w-1/2  mt-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="AuthorName"
              type="text"
              name="author"
              placeholder="Author Name"
            />
            <input
              className="px-4 w-full sm:w-1/2 mt-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="AuthorName"
              type="text"
              name="author"
              placeholder="Author Name"
            />

            <button className="px-4 w-full sm:w-1/2 mt-3 py-2 text-sm leading-tight text-wh border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-orange-500">
              Create Prompt
            </button>
          </div>
        </div>

        <div className="relative w-full mt-5 border-2 p-5 bg-slate-300  rounded-lg">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal ">
            <strong>
              {" "}
              Solve Your Small Business Problems with 1-Click Prompts
            </strong>
            .
          </h1>
          <div className="flex mt-2">
            <Button variant="outlined" startIcon={<ContentCopyIcon />}>
                Copy To Clipboard
            </Button>
            <Button variant="outlined" style={{
                marginLeft: "10px"
            }} startIcon={<ChatIcon />}>
               Genarate Result 
            </Button>
          </div>
        </div>

        <div className="relative w-full mt-5 border-2 p-5 bg-slate-800  rounded-lg">
          <h1 className="text-sm text-white font-medium text-black-600 leading-normal ">
            Where does it come from? Contrary to popular belief, Lorem Ipsum is
            not simply random text. It has roots in a piece of classical Latin
            literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia,
            looked up one of the more obscure Latin words, consectetur, from a
            Lorem Ipsum passage, and going through the cites of the word in
            classical literature, discovered the undoubtable source. Lorem Ipsum
            comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
            Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
            BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
            dolor sit amet..", comes from a line in section 1.10.32. The
            standard chunk of Lorem Ipsum used since the 1500s is reproduced
            below for those interested. Sections 1.10.32 and 1.10.33 from "de
            Finibus Bonorum et Malorum" by Cicero are also reproduced in their
            exact original form, accompanied by English versions from the 1914
            translation by H. Rackham. Where can I get some? There are many
            variations of passages of Lorem Ipsum available, but the majority
            have suffered alteration in some form, by injected humour, or
            randomised words which don't look even slightly believable. If you
            are going to use a passage of Lorem Ipsum, you need to be sure there
            isn't anything embarrassing hidden in the middle of text. All the
            Lorem Ipsum generators on the Internet tend to repeat predefined
            chunks as necessary, making this the first true generator on the
            Internet. It uses a dictionary of over 200 Latin words, combined
            with a handful of model sentence structures, to generate Lorem Ipsum
            which looks reasonable. The generated Lorem Ipsum is therefore
            always fr .
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PromptAction;
