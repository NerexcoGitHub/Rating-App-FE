import ArticleCard from '../../components/ArticleCards/ArticleCard';
import { SORTED_ARTICLES_BY_DATE } from '../../../BLOG_CONSTANTS/_ARTICLES_LIST';
import { PROMPT_SELECT } from '../../../BLOG_CONSTANTS/_PROMPT_SELECT';
import { useRouter } from 'next/router';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { PageLayout } from '../../components';
import { combineClasses } from '../../utils/utils';
import ReactPaginate from 'react-paginate';
import { Key, useEffect, useState } from 'react';
import { iArticle } from '../../shared/interfaces';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';
import SelectComponent from './SelectComponent';
import { publicRequest } from '../../../config/axiosRequest';
import SearchForm from './SearchComponent';

const BlogIndexPage = ({
  articlesPerPage = 3,
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

  // const [ARTICLES, setARTICLES] = useState(SORTED_ARTICLES_BY_DATE);

  // useEffect(() => {
  //   setARTICLES(
  //     category
  //       ? categoryArticles
  //       : author
  //       ? authorArticles
  //       : SORTED_ARTICLES_BY_DATE
  //   );
  // }, [category, author]);
  function createInitialObject() {
    const initObject: { [key: string]: string | number } = {};
    PROMPT_SELECT.forEach((item) => {
      initObject[item.name] = '0';
    });
    initObject['search'] = '';

    return initObject;
  }
  const initObject = createInitialObject();

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filterOption, setFilterOption] = useState(initObject);
  const [prompts, setPrompts] = useState([]);
  const [filters, setFilters] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + articlesPerPage;
    setCurrentItems(prompts.slice(itemOffset, endOffset));
    console.log(prompts.length, articlesPerPage);
    setPageCount(Math.ceil(prompts.length / articlesPerPage));
  }, [itemOffset, articlesPerPage, prompts]);

  useEffect(() => {
    publicRequest
      .post('/user/get-prompts', filterOption)
      .then((res) => {
        console.log(res.data);
        setPrompts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterOption]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * articlesPerPage) % prompts.length;
    setItemOffset(newOffset);
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFilterOption({ ...filterOption, [name]: value });
  };

  const handleSearchChange = (value: string) => {
    setFilterOption({ ...filterOption, ['search']: value });
  };
  const divVariants = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <LayoutGroup>
      <div
        className={combineClasses(
          'container mt-2 md:mt-6 md:pt-0 px-0 md:px-3',
          'pt-0'
        )}
      >
        <SearchForm
          handleSearchChange={handleSearchChange}
          setFilters={() => setFilters(!filters)}
        />
        <br />
        <br />
        {/* {category || author ? (
          <h1
            className="px-2 mb-[30px] text-[45px] font-bold"
            style={{ textTransform: "capitalize" }}
          >
            {category || author}
            <hr className="mt-[10px]" />
          </h1>
        ) : null} */}
        <AnimatePresence>
          {filters && (
            <motion.div
              className='flex justify-between'
              animate='visible'
              initial='hidden'
              variants={divVariants}
              layout
            >
              <div className='flex flex-wrap'>
                {PROMPT_SELECT.map(
                  (
                    each: { options: any; label: any; name: any },
                    i: Key | null | undefined
                  ) => {
                    return (
                      <SelectComponent
                        options={each.options}
                        onChange={handleSelectChange}
                        value={filterOption[each.name]}
                        label={each.label}
                        name={each.name}
                        className={''}
                        key={i}
                      />
                    );
                  }
                )}
              </div>
              <button
                onClick={() => {
                  setFilterOption(createInitialObject());
                }}
                className='bg-blue-500 hover:bg-blue-700 text-white text-center font-bold text-[10px] sm:text-[15px] mt-9 mr-1 rounded w-20 h-9'
              >
                Reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <br />
        <br />
        <AnimatePresence>
          <motion.div
            className='flex flex-wrap'
            animate='visible'
            initial='hidden'
            variants={divVariants}
            layout
          >
            {currentItems.length > 0
              ? (currentItems as any).map((each: any, i: any) => (
                  <ArticleCard article={each} path={'test'} key={i} />
                ))
              : null}
          </motion.div>

          <motion.div layout>
            <ReactPaginate
              breakLabel='...'
              nextLabel={<AiFillCaretRight />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel={<AiFillCaretLeft />}
              containerClassName='pagination'
              activeClassName='active'
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
};

export default BlogIndexPage;
