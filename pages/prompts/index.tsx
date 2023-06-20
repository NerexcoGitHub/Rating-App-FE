import { PageLayout } from "../../src/components";
import BlogIndexPage from "../../src/components/BlogIndexPage";

const AllArticles = () => {
  return(
  <PageLayout home>
    <BlogIndexPage articlesPerPage={6} />
  </PageLayout>);
};

export default AllArticles;
