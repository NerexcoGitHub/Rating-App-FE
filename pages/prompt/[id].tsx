import { useEffect, useState } from "react";
import { PageLayout } from "../../src/components";
import BlogIndexPage from "../../src/components/BlogIndexPage";
import PromptTop from "../../src/components/Prompt/PromptTop";
import PromptAction from "../../src/components/Prompt/promptAction";
import { useRouter } from "next/router";
import { publicRequest } from "../../config/axiosRequest";

const Prompt = () => {
  const router = useRouter();
  const { id } = router.query;
  const [prompt, setPrompt] = useState({});

  useEffect(() => {
    if (id) {
      publicRequest
        .get(`/user/get-promptbyid/${id}`)
        .then((res) => {
          console.log(res.data);
          setPrompt(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <PageLayout home>
      <PromptTop prompt={prompt}/>
      <PromptAction prompt={prompt}/>
    </PageLayout>
  );
};

export default Prompt;
