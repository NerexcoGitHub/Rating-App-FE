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
import { useEffect, useState } from "react";
import { publicRequest } from "../config/axiosRequest";
import { successToast } from "../src/components/ToastComponent/SuccessToast";
import { errToast } from "../src/components/ToastComponent/ErrToast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

interface FormValues {
  title: string;
  description: string;
  category: string;
  inputParams: string;
  prompt: string;
  designation: string;
}

const options = [
  { label: "All", value: "all" },
  { label: "Blogs and articles", value: "blogsAndArticles" },
  { label: "Ads and marketing", value: "adsAndMarketing" },
  { label: "E-commerce", value: "eCommerce" },
  { label: "Social media", value: "socialMedia" },
  { label: "Website", value: "website" },
  { label: "Academic", value: "academic" },
  { label: "Other", value: "other" },
];

const EditPromt = () => {
  const PAGE_SEO: iSEO = {
    title: "Contact Us",
    description:
      "For any any queries related to this project / template feel free to connect with us on webexpe13@gmail.com",
    keywords: "webexpx, contact us, webexpe13@gmail.com, next js blog template",
    author: "Mayur Nalwala, Rupali Yadav",
  };
  const router = useRouter();
  const [promptData, setPromptData] = useState({
    userId: "",
  });
  const [prompt, setPrompt] = useState({} as any);
  const [initialValues, setInitialValues] = useState<FormValues>({} as any);
  const [cookies, setCookie, removeCookie] = useCookies(["authorId"]);
  const { author } = router.query;

  author &&
    setCookie("authorId", author, {
      path: "/",
    });

  useEffect(() => {
    const authorId = cookies.authorId;
    const prompts = publicRequest
      .get("/user/get-promptbyid/" + author)
      .then((res) => {
        setPrompt(res.data);
      })
      .catch((err) => {});
  }, [author]);

  useEffect(() => {
    setInitialValues({
      title: prompt?.title,
      description: prompt?.description,
      category: prompt?.category,
      inputParams: prompt?.inputParams,
      prompt: prompt?.prompt,
      designation: prompt?.author?.designation,
    });
  }, [prompt]);

  const handleSubmit = async (values: FormValues) => {
    const filteredObj = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    console.log(filteredObj);
    const Id = cookies.authorId;
    const res = publicRequest
      .patch("/user/update-prompt/" + Id, filteredObj)
      .then((res) => {
        successToast("update successfully!", 3000);
      })
      .catch((err) => {
        errToast("Something went wrong!");
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string().optional(),
    description: Yup.string().optional(),
    designation: Yup.string().optional(),
    category: Yup.string().optional(),
    inputParams: Yup.string().optional(),
    prompt: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
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
              <h3 className="pt-4 text-2xl text-center">Edit a Prompt!</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={formik.handleSubmit}
              >
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
                  {formik.touched.designation && formik.errors.designation && (
                    <p className="text-red-500 text-xs italic">
                      {formik.errors.designation}
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
                    placeholder={prompt?.description}
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
                    id="category"
                    placeholder={prompt?.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    name="category"
                  >
                    {options.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
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
                    placeholder={prompt?.inputParams}
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
                    placeholder={prompt?.prompt}
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

export default EditPromt;
function filteredObj(values: FormValues) {
  throw new Error("Function not implemented.");
}
