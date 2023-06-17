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
import { publicRequest } from "../config/axiosRequest";
import { successToast } from "../src/components/ToastComponent/SuccessToast";
import { errToast } from "../src/components/ToastComponent/ErrToast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PROMPT_SELECT } from "../BLOG_CONSTANTS/_PROMPT_SELECT";

interface FormValues {
  author: string;
  designation: string;
  title: string;
  description: string;
  category: string;
  inputParams: string;
  prompt: string;
  userId: string;
}

const options = [
  { label: "all", value: "all" },
  { label: "blogs and articles", value: "blogsAndArticles" },
  { label: "ads and marketing", value: "adsAndMarketing" },
  { label: "e-commerce", value: "eCommerce" },
  { label: "social media", value: "socialMedia" },
  { label: "website", value: "website" },
  { label: "academic", value: "academic" },
  { label: "other", value: "other" },
];

const AddPromt = () => {
  const PAGE_SEO: iSEO = {
    title: "Contact Us",
    description:
      "For any any queries related to this project / template feel free to connect with us on webexpe13@gmail.com",
    keywords: "webexpx, contact us, webexpe13@gmail.com, next js blog template",
    author: "Mayur Nalwala, Rupali Yadav",
  };

  const [promptData, setPromptData] = useState({
    userId: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setPromptData({
      ...promptData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (values: FormValues) => {
   
    console.log(values);
    const res = publicRequest
      .post("/user/add-prompt", values)
      .then((res) => {
        console.log(res);
        successToast(`save your secret key ${res.data.result.author}`, false);
      })
      .catch((err) => {
        console.log(err);
        errToast("Something went wrong");
      });
  };

  const validationSchema = Yup.object({
    author: Yup.string().required("Author Name is required"),
    designation: Yup.string().required("Designation is required"),
    title: Yup.string().required("Prompt Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    inputParams: Yup.string().required("Input Parameters are required"),
    prompt: Yup.string().required("Prompt is required"),
    userId: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      author: "",
      designation: "",
      title: "",
      description: "",
      category: "",
      inputParams: "",
      prompt: "",
      userId: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

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
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={formik.handleSubmit}>
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
                      name="author"
                      placeholder="Author Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.author}
                    />
                    {formik.touched.author && formik.errors.author && (
                      <p className="text-red-500 text-xs italic">
                        {formik.errors.author}
                      </p>
                    )}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.designation}
                    />
                    {formik.touched.designation &&
                      formik.errors.designation && (
                        <p className="text-red-500 text-xs italic">
                          {formik.errors.designation}
                        </p>
                      )}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.title}
                    </p>
                  )}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.description}
                    </p>
                  )}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    name="category"
                  >
                    {
                      options.map((option) => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                      )
                      )
                    }
                  </select>
                  {formik.touched.category && formik.errors.category && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.category}
                    </p>
                  )}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.inputParams}
                  />
                  {formik.touched.inputParams && formik.errors.inputParams && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.inputParams}
                    </p>
                  )}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prompt}
                  />
                  {formik.touched.prompt && formik.errors.prompt && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.prompt}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="userId"
                  >
                    Author ID (If Have)
                  </label>
                  <input
                    name="userId"
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="userId"
                    type="text"
                    placeholder="If you have an author ID, please enter it here."
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
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    
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
