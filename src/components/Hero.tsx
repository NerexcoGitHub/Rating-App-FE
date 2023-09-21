import React, { useMemo } from 'react';
import Image from 'next/image';
import ButtonPrimary from './Misc/ButtonPrimary';
import { motion } from 'framer-motion';
import styles from './hero.module.scss';
import getScrollAnimation from '../utils/getScrollAnimation';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import Lottie from 'react-lottie';
import askme from '../../public/assets/AskMe.json';
const Hero = ({
  listUser = [
    {
      name: 'Users',
      number: '390',
      icon: '/assets/Icon/heroicons_sm-user.svg',
    },
    {
      name: 'Prompts',
      number: '20',
      icon: '/assets/Icon/gridicons_location.svg',
    },
    {
      name: 'Ratings',
      number: '50',
      icon: '/assets/Icon/bx_bxs-server.svg',
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  //determine if mobile
  return (
    <div
      className='max-w-screen-xl mt-7 px-8 xl:px-16 mx-auto mb-5 '
      id='about'
    >
      <motion.div
        className='flex flex-col-reverse lg:flex-row content-between items-center  lg:items-center lg:space-x-8 space-y-8 lg:space-y-0 mt-20'
        variants={scrollAnimation}
      >
        <div className='flex flex-col justify-center items-start row-start-2 sm:row-start-1'>
          <h1 className='text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal'>
            AskMe - Your Prompt Companion
          </h1>
          <br />
          <p className='text-black-500 mt-4 mb-6'>
            Superpower your AI ChatBot with AskMe, a prompt companion to help
            you decide what to ask!
          </p>
          <br />
          <div className='mx-auto lg:mx-0'>
            <ButtonPrimary />
            <h2>Chrome Extension for ChatGPT</h2>
          </div>
        </div>

        <div className='relative w-full'>
          <div
            className={`absolute top-[15%] left-36 w-60 h-60 rounded-full bg-orange-500 mix-blend-multiply  opacity-50 ${styles.blob1} filter blur-xl`}
          ></div>
          <div
            className={`absolute top-[15%] right-28 w-60 h-60 rounded-full bg-orange-300 mix-blend-multiply  opacity-50 ${styles.blob2} filter blur-xl`}
          ></div>
          <div
            className={`absolute top-[30%] left-60  w-60 h-60 rounded-full bg-red-500 mix-blend-multiply opacity-50 ${styles.blob3} filter blur-xl`}
          ></div>

          <div className='flex w-full'>
            <motion.div className='h-full w-full' variants={scrollAnimation}>
              {/* <Image
                src='/assets/hero.svg'
                alt='Hero Image'
                objectFit='contain'
                quality={100}
                width={612}
                height={399}
                layout='responsive'
              /> */}
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: askme,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                height={window.innerWidth < 768 ? 300 : 400}
                width={window.innerWidth < 768 ? 300 : 400}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* <div className='relative w-full hidden md:flex'> */}
      {/* <ScrollAnimationWrapper className='rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-0'>
          {listUser.map((listUsers, index) => (
            <motion.div
              className='flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0'
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className='flex mx-auto w-40 sm:w-auto'>
                <div className='flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full'>
                  <img src={listUsers.icon} className='h-6 w-6' />
                </div>
                <div className='flex flex-col'>
                  <p className='text-xl text-black-600 font-bold'>
                    {listUsers.number}+
                  </p>
                  <p className='text-lg text-black-500'>{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper> */}
      {/* <div
          className='absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0'
          style={{ filter: 'blur(114px)' }}
        ></div> */}
      {/* </div> */}
    </div>
  );
};

export default Hero;
