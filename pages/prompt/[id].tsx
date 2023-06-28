import { useRouter } from "next/router";
import PromptPage from "../../src/components/PromptPage";
import { PageLayout } from "../../src/components";

export default function Prompt() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <PageLayout> 
      <PromptPage id={id} />
    </PageLayout>
  );
}
