import { LogoType, NavbarType } from "../src/shared/enums";
import { IAuthor, iNavSetup, iSEO } from "../src/shared/interfaces";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin, AiFillInstagram, AiFillFacebook } from "react-icons/ai";

/**
 * EXAMPLE AUTHOR
 * 
 export const AUTHOR_NAME: IAuthor = {
    name: "Full Name",
    designation: "Work Designation",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
     social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/'
        },
    ]
}
 */

export const MAYUR: IAuthor = {
    name: "Nerexco",
    designation: "Software Engineer",
    bio: "Software Company",
    profilePic: "",
    social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/nmayur'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/in/mayur-nalwala/'
        },
    ]
}

export const RUPALI: IAuthor = {
    name: "Nuwan Perera",
    designation: "IT Analyst",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
    social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/rupali-yadav'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/in/rupali-yadav-087bb4112/'
        },
    ]
}


// This can your company name / your name etc for SEO purposes
export const WEBSITE_NAME: string = 'Promt Rating App';
export const WEBSITE_URL: string = '';

/**
 * This is the main navigation setup.
 * This includes the main navbar and the side drawer.
 */
export const PRIMARY_NAV: iNavSetup = {
    type: NavbarType.DEFAULT,
    // max logo image height 40px
    // you can add logo light version if using image
    // logo: {
    //     type: LogoType.IMAGE,
    //     logo: '/images/logo.png',
    //     logoLight: '/images/logo-light.png'
    // },
    logo: {
        type: LogoType.TEXT,
        logo: 'Prompt Rating',
    },
    // navLinks are the main navbar links that apper on top of every page
    navLinks: [
        {
            label: 'Home',
            path: '/'
        },
        {
            // for categories don't add path and add type: dropdown and pass path empty
            label: 'Blog',
            type: '',
            path: '/blog'
        },
        {
            label: 'About Us',
            path: '/about-us'
        },
        // {
        //     // to open a link in new tab pass newTab: true
        //     label: 'Support Us',
        //     path: 'https://www.buymeacoffee.com/webexpe13z',
        //     newTab: true
        // },
        // {
        //     label: 'Github Repo',
        //     path: 'https://github.com/webexpe13/blog-template-using-nextjs-typescript-tailwindcss',
        //     newTab: true
        // },
        {
            label: 'Add Prompt',
            path: '/add-prompt'
        },
        {
            label: 'Contact Us',
            path: '/contact-us'
        }
    ],
    // sideNavLinks are the links which appear when you open the side menu after clicking the burger menu icon.
    sideNavLinks: [
        {
            label: 'Home',
            path: '/'
        },
        {
            label: 'Add Prompt',
            path: '/add-prompt'
        },
        {
            // for categories dont add path and add type: dropdown
            label: 'Blog',
            type: 'dropdown',
            path: ''
        },
        {
            label: 'About Us',
            path: '/about-us'
        },
        // {
        //     label: 'Support Us',
        //     path: 'https://www.buymeacoffee.com/webexpe13z',
        //     newTab: true
        // },
        // {
        //     label: 'Github Repo',
        //     path: 'https://github.com/webexpe13/blog-template-using-nextjs-typescript-tailwindcss',
        //     newTab: true
        // },
        {
            label: 'Contact Us',
            path: '/contact-us'
        }
    ],
    socials: []
}

export const DEFAULT_SEO: iSEO = {
    title: "prompt rating app",
    description: "prompt rating app",
    keywords: "prompt rating app",
    url: WEBSITE_URL,
    author: `${MAYUR.name}, ${RUPALI.name}`,
    twitterHandle: '@WebExpe',
    ogImage: '/public/images/og-image.jpg'
}