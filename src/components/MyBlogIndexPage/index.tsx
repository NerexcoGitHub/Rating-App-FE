import { SORTED_ARTICLES_BY_DATE } from "../../../BLOG_CONSTANTS/_ARTICLES_LIST";
import { PROMPT_SELECT } from "../../../BLOG_CONSTANTS/_PROMPT_SELECT";
import { useRouter } from "next/router";
import { PageLayout } from "../../components";
import { combineClasses } from "../../utils/utils";
import ReactPaginate from "react-paginate";
import { Key, useEffect, useState } from "react";
import { iArticle } from "../../shared/interfaces";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { publicRequest } from "../../../config/axiosRequest";
import MySearchForm from "./MyPromptsSearch";
import MyArticleCard from "../ArticleCards/MyArticleCard";

const MyBlogIndexPage = ({
  articlesPerPage = 6,
}: {
  articlesPerPage?: number;
}) => {
  // const router = useRouter();
  // const { category, author } = router.query;
  // const categoryArticles = SORTED_ARTICLES_BY_DATE.filter(
  //   (each) => each.preview.category === category
  // );
  // const authorArticles = SORTED_ARTICLES_BY_DATE.filter(
  //   (each) => each.preview.author.name === author
  // );

  const [ARTICLES, setARTICLES] = useState(SORTED_ARTICLES_BY_DATE);

  // useEffect(() => {
  //   setARTICLES(
  //     category
  //       ? categoryArticles
  //       : author
  //       ? authorArticles
  //       : SORTED_ARTICLES_BY_DATE
  //   );
  // }, [category, author]);

  const [currentItems, setCurrentItems] = useState(ARTICLES);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [author, setAuthor] = useState("");
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + articlesPerPage;
    setCurrentItems(ARTICLES.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ARTICLES.length / articlesPerPage));
  }, [itemOffset, articlesPerPage, ARTICLES]);

  useEffect(() => {
    const prompts = publicRequest
      .get(`/user/get-myprompts/${author}`)
      .then((res) => {
        console.log(res.data);
        setPrompts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [author]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * articlesPerPage) % ARTICLES.length;
    setItemOffset(newOffset);
  };

  const handleSearchChange = (value: string) => {
   setAuthor(value);
  };

  return (
    <PageLayout home>
      <div
        className={combineClasses(
          "container mt-10 md:pt-0 px-0 md:px-3",
          "pt-14"
        )}
      >
        {/* {category || author ? (
          <h1
            className="px-2 mb-[30px] text-[45px] font-bold"
            style={{ textTransform: "capitalize" }}
          >
            {category || author}
            <hr className="mt-[10px]" />
          </h1>
        ) : null} */}

        <MySearchForm handleSearchChange={handleSearchChange} />
        <hr className="mt-[5px] mb-[15px]" />

        <div className="flex flex-wrap">
          {prompts.length > 0
            ? (prompts as any).map((each: any, i: any) => (
                <MyArticleCard article={each} path={"test"} key={i} />
              ))
            : null}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiFillCaretRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={<AiFillCaretLeft />}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </PageLayout>
  );
};

export default MyBlogIndexPage;
