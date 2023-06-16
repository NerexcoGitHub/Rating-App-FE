import { iSEO } from "../src/shared/interfaces";
import {
  PageLayout,
  Text,
  List,
  Image,
  LinkTo,
  Seperator,
  Slider,
} from "../src/components";
import { useState } from "react";

const AddPromt = () => {
  const PAGE_SEO: iSEO = {
    title: "Contact Us",
    description:
      "For any any queries related to this project / template feel free to connect with us on webexpe13@gmail.com",
    keywords: "webexpx, contact us, webexpe13@gmail.com, next js blog template",
    author: "Mayur Nalwala, Rupali Yadav",
  };

  const [promptData, setPromptData] = useState({});

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setPromptData({
      ...promptData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(promptData);
  return (
    <PageLayout PAGE_SEO={PAGE_SEO} home>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg bg-[url(https://firebasestorage.googleapis.com/v0/b/premier-mart-9aa09.appspot.com/o/test.jpg?alt=media&token=42044ce8-0c91-41ea-9887-1d7772bb29ad)] 
            bg-no-repeat bg-left"
            ></div>

            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create a Prompt!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="authorName"
                    >
                      Author Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="AuthorName"
                      type="text"
                      name="userName"
                      placeholder="Author Name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className=" md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="designation"
                    >
                      Designation
                    </label>
                    <input
                      name="designation"
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="designation"
                      type="text"
                      placeholder="Designation"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="promptTitle"
                  >
                    Prompt Title
                  </label>
                  <input
                    name="title"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="promptTitle"
                    type="text"
                    placeholder="Prompt Title"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Description
                  </label>
                  <input
                  name="description"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="description"
                    type="text"
                    placeholder="Description"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="keyWords"
                  >
                    Category
                  </label>
                  <select
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="keyWords"
                    placeholder="select category"
                    onChange={handleInputChange}
                    name='category'
                  >
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="inputParameters"
                  >
                    Input Parameters
                  </label>
                  <input
                  name="inputParams"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="inputParameters"
                    type="text"
                    placeholder="Input Parameters (comma seperated)-book,author,genre"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="prompt"
                  >
                    Prompt
                  </label>
                  <textarea
                  name="prompt"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="prompt"
                    placeholder="Add Prompt-I want to read a {book} by {author} in {genre}"
                    onChange={handleInputChange}
                  />
                </div>
                {/* <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p className="text-xs italic text-red-500">
                      Please choose a password.
                    </p>
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div> */}
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Save Prompt
                  </button>
                </div>
                <hr className="mb-6 border-t" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddPromt;
