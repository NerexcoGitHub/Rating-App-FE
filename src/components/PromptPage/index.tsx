import React, { useEffect, useState } from "react";
import Image from "next/image";
import { publicRequest } from "../../../config/axiosRequest";
import { useFormik } from "formik";
import * as Yup from "yup";

function PromptPage(params: any) {
  const { id } = params;
  const [initialValues, setInitialValues] = useState<any>({
    title: "",
    description: "",
    category: "",
    inputParams: "",
    prompt: "",
  });

  const [prompt, setPrompt] = useState<any>([]);

  useEffect(() => {
    if (id) {
      publicRequest
        .get(`/user/get-promptbyid/${id}`)
        .then((res) => {
          setPrompt(res.data);
        })
        .catch((err) => {});
    }
  }, [id]);

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

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    title: Yup.string().optional(),
    description: Yup.string().optional(),
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

  console.log(id);
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-2xl font-bold text-[#07074D]"
            >
              {prompt?.title}
            </label>
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Category
            </label>
            <input
              type="category"
              name="category"
              id="category"
              value={formik.values.category}
              placeholder="Enter your Category"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="inputParams"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Input Parameters
            </label>
            <input
              type="inputParams"
              name="inputParams"
              id="inputParams"
              value={formik.values.inputParams}
              placeholder="Enter your inputParams"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Description
            </label>
            <textarea
              rows={4}
              name="description"
              id="description"
              value={formik.values.description}
              placeholder="Enter your description"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>

          <div className="mb-5">
            <label
              htmlFor="prompt"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Prompt
            </label>
            <textarea
              rows={4}
              name="prompt"
              value={formik.values.prompt}
              id="prompt"
              placeholder="Enter your Prompt"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Try this prompt on ChatGPT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PromptPage;
