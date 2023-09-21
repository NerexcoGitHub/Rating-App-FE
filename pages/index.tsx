/**These are necessary imports / components for the page */
import { PageLayout, Text, LinkTo } from '../src/components';
import { DEFAULT_SEO } from '../BLOG_CONSTANTS/_BLOG_SETUP';
import FeaturedArticleSection from '../src/components/Misc/FeaturedArticleSection';
import HomeNonFeatureArticles from '../src/components/Misc/HomeNonFeatureAricles';
import Hero from '../src/components/Hero';
import BlogIndexPage from '../src/components/BlogIndexPage';

const Home = () => {
  return (
    <PageLayout home PAGE_SEO={DEFAULT_SEO}>
      <Hero />
      <div className='container mx-auto lg:px-[15px] px-0'>
        <div className={'flex flex-wrap'}>
          {/* <h1 className='px-3 w-full mb-5 mt-5 md:mt-0 text-md md:text-3xl font-medium text-center'>
            Let's get started! Pick a prompt, and try it out!
          </h1> */}
          <BlogIndexPage articlesPerPage={6} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
