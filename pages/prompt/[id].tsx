import { PageLayout } from "../../src/components";
import BlogIndexPage from "../../src/components/BlogIndexPage";
import PromptTop from "../../src/components/Prompt/PromptTop";
import PromptAction from "../../src/components/Prompt/promptAction";
import { useRouter } from "next/router";

const Prompt = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <PageLayout home>
      <PromptTop />
      <PromptAction />
    </PageLayout>
  );
};

export default Prompt;
