import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '../Portal';
import styles from './style.module.scss';

export default function Modal({
  children,
  open,
  closeModal,
  fullHeight,
}: {
  children: React.ReactNode;
  open: boolean;
  closeModal: any;
  fullHeight: boolean;
}) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  });
  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  const modalVariants = {
    hidden: {
      y: 200,
      opacity: 0,
      transition: {
        type: 'spring',
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
      },
    },
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <Portal selector='#modal'>
            <motion.div
              className={styles.backdrop}
              onClick={closeModal}
              variants={backdropVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <motion.div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                layout
              >
                <div className='text-right'>
                  <button
                    className='bg-gray-50 hover:bg-gray-200  font-bold py-1 px-1 rounded-[2rem]'
                    onClick={closeModal}
                  >
                    <svg
                      width='32px'
                      height='32px'
                      viewBox='0 0 24 24'
                      fill='#777777'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z' />
                    </svg>
                  </button>
                </div>
                <motion.div
                  className={`${styles.modalContent} ${
                    fullHeight && styles.fullHeightModal
                  }`}
                  layoutScroll
                >
                  {children}
                </motion.div>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}
