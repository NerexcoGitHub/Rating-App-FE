import { useEffect, useState } from 'react';
import { THEMES } from '../../shared/enums';
import {
  addBodyNoScroll,
  combineClasses,
  getCategories,
  removeBodyNoScroll,
} from '../../utils/utils';
import classes from './Navbar.module.scss';
import { Text, LinkTo } from '../../components';
import { useTheme } from 'next-themes';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import NavCatergoryDD from '../Misc/NavCategoryDD';
import { iNavLink, iNavSetup, iNavSocials } from '../../shared/interfaces';

interface IProps {
  openSidebar: boolean;
  closeNavSidebar: () => void;
  navSetup: iNavSetup;
  changeTheme: () => void;
}

const NavSidebar = ({
  openSidebar = false,
  closeNavSidebar,
  navSetup,
  changeTheme,
}: IProps) => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    openSidebar ? addBodyNoScroll() : removeBodyNoScroll();

    return () => {
      removeBodyNoScroll();
    };
  }, [openSidebar]);

  const env = process.env.NODE_ENV;
  const [openDD, setOpenDD] = useState(false);

  return (
    <>
      {openSidebar ? (
        <div className='backdrop' onClick={closeNavSidebar}></div>
      ) : null}

      <aside
        className={combineClasses(
          classes.nav_sidebar_wrapper,
          openSidebar && classes.open,
          'dark:bg-slate-900 dark:text-white bg-white text-black'
        )}
      >
        <div
          className='flex items-center justify-between pb-3'
          onClick={closeNavSidebar}
        >
          <div className='mx-auto'>
            <MdOutlineClose className='text-slate-800 dark:text-white text-[25px] ' />
          </div>
        </div>
        <div className='my-15'>
          {navSetup.sideNavLinks.map((each: iNavLink, i: any) =>
            each.type !== 'dropdown' ? (
              !each.newTab ? (
                <LinkTo
                  href={each.path}
                  key={i}
                  passHref
                  className='text-[20px] block my-10 text-center'
                >
                  {each.label}
                </LinkTo>
              ) : (
                <a
                  href={each.path}
                  key={each.path}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[25px] block my-3 flex-wrap'
                >
                  {each.label}
                </a>
              )
            ) : (
              <NavCatergoryDD
                label={each.label}
                openDD={openDD}
                setOpenDD={() => setOpenDD(!openDD)}
                key={i}
              />
            )
          )}
          {
            // env === 'development' ?
            //     <>
            //         <hr />
            //         <Text subtitle className='mt-3 !text-[18px]'>Examples and tutorials</Text>
            //         <LinkTo href='/pages/tutorial/all-components.tsx' passHref className='text-[16px] block my-3'>
            //             All Components
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/style-guide.tsx' passHref className='text-[16px] block my-3'>
            //             Style Guide
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/home-layout.tsx' passHref className='text-[16px] block my-3'>
            //             Home Page Layout
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/blog-with-sidebar-layout.tsx' passHref className='text-[16px] block my-3'>
            //             Page Layout for article with sidebar
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/blog-with-centered-layout.tsx' passHref className='text-[16px] block my-3'>
            //             Page Layout for centered article
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/how-to-setup-blog.tsx' passHref className='text-[16px] block my-3'>
            //             How to setup your blog
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/how-to-write-your-first-article.tsx' passHref className='text-[16px] block my-3'>
            //             How to write your first article
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/how-to-deploy-blog.tsx' passHref className='text-[16px] block my-3'>
            //             How to export the blog
            //         </LinkTo>
            //         <LinkTo href='/pages/tutorial/icons.tsx' passHref className='text-[16px] block my-3'>
            //             Icons
            //         </LinkTo>
            //     </>
            //     : null
          }
        </div>
      </aside>
    </>
  );
};

export default NavSidebar;
