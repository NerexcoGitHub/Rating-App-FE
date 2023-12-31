import { iArticle } from "../src/shared/interfaces";

// Import author profiles, just type the name you have set in _BLOG_SETUP inside the curly brackets
import { MAYUR, RUPALI } from "./_BLOG_SETUP";

// main article list to display all atricles
/**
 * Example article object
 * 
 {
    path: '/pages/tutorial/tutorial/how-to-setup-blog',
    featureArticle: true,
    preview: {
        // the author object you created in _BLOG_SETUP file
        author: MAYUR,
        date: "March 03 2022",
        articleTitle: "How to setup this plog template",
        tags: "demo, blog setup",
        thumbnail: "/images/tutorials/demo-image.jpg",
        shortIntro: "These are the steps to setup your blog",
    },
    seo: {
        title: "These are the steps to setup your blog",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        keywords: "demo, blog setup",
        ogImage: "/images/tutorials/demo-image.jpg",
        twitterHandle: "@mayur_nalwala",
    }
}
 */

// clear this article list and add your own
const ARTICLES_LIST: iArticle[] = [
  {
    path: "/pages/tutorial/how-to-setup-blog.tsx",
    featureArticle: true,
    preview: {
      author: MAYUR,
      date: "August 08 2022",
      articleTitle: "How to setup this blog template",
      tags: "demo, blog setup",
      thumbnail: "/public/assets/Illustration3.png",
      shortIntro: "These are the steps to setup your blog",
      category: "tutorial",
      prompt: "You know your small business. Use prompts to quickly finish everything else…",
    },
    seo: {
      title: "How to setup this blog template",
      description: "These are the steps to setup your blog",
      keywords: "demo, blog setup",
      ogImage: "/public/assets/Illustration3.png",
      twitterHandle: "@mayur_nalwala",
      author: MAYUR.name,
    },
  },
  {
    path: "/pages/tutorial/how-to-setup-blog.tsx",
    featureArticle: true,
    preview: {
      author: MAYUR,
      date: "August 08 2022",
      articleTitle: "How to setup this blog template",
      tags: "demo, blog setup",
      thumbnail: "/public/assets/Illustration3.png",
      shortIntro: "These are the steps to setup your blog",
      category: "tutorial",
      prompt: "You know your small business. Use prompts to quickly finish everything else…",
    },
    seo: {
      title: "How to setup this blog template",
      description: "These are the steps to setup your blog",
      keywords: "demo, blog setup",
      ogImage: "/public/assets/Illustration3.png",
      twitterHandle: "@mayur_nalwala",
      author: MAYUR.name,
    },
  },
  {
    path: "/pages/tutorial/how-to-setup-blog.tsx",
    featureArticle: true,
    preview: {
      author: MAYUR,
      date: "August 08 2022",
      articleTitle: "How to setup this blog template",
      tags: "demo, blog setup",
      thumbnail: "/public/assets/Illustration3.png",
      shortIntro: "These are the steps to setup your blog",
      category: "tutorial",
      prompt: "You know your small business. Use prompts to quickly finish everything else…",
    },
    seo: {
      title: "How to setup this blog template",
      description: "These are the steps to setup your blog",
      keywords: "demo, blog setup",
      ogImage: "/public/assets/Illustration3.png",
      twitterHandle: "@mayur_nalwala",
      author: MAYUR.name,
    },
  },
  {
    path: "/pages/tutorial/how-to-setup-blog.tsx",
    featureArticle: true,
    preview: {
      author: MAYUR,
      date: "August 08 2022",
      articleTitle: "How to setup this blog template",
      tags: "demo, blog setup",
      thumbnail: "/public/assets/Illustration3.png",
      shortIntro: "These are the steps to setup your blog",
      category: "tutorial",
      prompt: "You know your small business. Use prompts to quickly finish everything else…",
    },
    seo: {
      title: "How to setup this blog template",
      description: "These are the steps to setup your blog",
      keywords: "demo, blog setup",
      ogImage: "/public/assets/Illustration3.png",
      twitterHandle: "@mayur_nalwala",
      author: MAYUR.name,
    },
  },
  {
    path: "/pages/tutorial/blog-with-sidebar-layout.tsx",
    preview: {
      author: MAYUR,
      date: "August 14 2022",
      articleTitle: "centered layout, blog page layout,",
      tags: "demo, with sidebar, default layout",
      thumbnail: "/public/assets/Illustration3.png",
      shortIntro:
        "In this article we will see Page Layout for a blog with sidebar example.",
      category: "layouts",
      prompt: "You know your small business. Use prompts to quickly finish everything else…",
    },
    seo: {
      keywords:
        "demo, with sidebar, blog page layout, blog page design with sidebar, webexpe, webexpe.com",
      ogImage: "/public/imp_assets/tutorials/blog-with-sidebar-layout.svg",
    },
  },
  {
    path: "/pages/tutorial/blog-with-centered-layout.tsx",
    preview: {
      author: RUPALI,
      date: "August 14 2022",
      articleTitle: "Lorem Ipsum is simply dummy",
      tags: "demo, centered, centered layout",
      thumbnail: "/public/assets/Illustration3.png",
      shortIntro:
        "This a demo article with centered layout and with demo of all the components.",
      category: "layouts", prompt: "You know your small business. Use prompts to quickly finish everything else…",
    },
    seo: {
      keywords:
        "demo, centered, centered layout, blog page layout, blog page design with centered layout, webexpe, webexpe.com",
      ogImage: "/public/imp_assets/tutorials/blog-with-centered-layout.svg",
    },
  },
  {
    path: "/pages/tutorial/all-components.tsx",
    preview: {
      author: RUPALI,
      date: "August 08 2022",
      articleTitle: "centered layout, blog page layout,",
      tags: "demo, all components",
      thumbnail: "/public/assets/Illustration3.png",
      shortIntro: "List of all usable components, its types and how to use it.",
      category: "tutorial", prompt: "You know your small business. Use prompts to quickly finish everything else…",
    },
    seo: {
      keywords: "demo, all components, webexpe, webexpe.com",
      ogImage: "/public/imp_assets/tutorials/all-components.svg",
    },
  },

 
];


export const SORTED_ARTICLES_BY_DATE = ARTICLES_LIST.sort((a, b) =>
  new Date(a.preview.date) > new Date(b.preview.date) ? -1 : 1
);
