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
