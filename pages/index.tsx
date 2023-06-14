/**These are necessary imports / components for the page */
import { PageLayout, Text, LinkTo } from "../src/components";
import { DEFAULT_SEO } from "../BLOG_CONSTANTS/_BLOG_SETUP";
import FeaturedArticleSection from "../src/components/Misc/FeaturedArticleSection";
import HomeNonFeatureArticles from "../src/components/Misc/HomeNonFeatureAricles";
import Hero from "../src/components/Hero";

const Home = () => {
  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
      <Hero />
      <div className="container mx-auto lg:px-[15px] px-0">
        <div className={"flex flex-wrap"}>
          <FeaturedArticleSection />
          <h1 className="px-3 w-full mb-5 text-xl md:text-3xl font-medium">
            You know your small business. Use prompts to quickly finish
            everything else…
          </h1>
          <hr className="border-1 mb-5 w-[98%] mx-auto" />
          <HomeNonFeatureArticles />
        </div>
      </div>
      
    </PageLayout>
  );
};

export default Home;
