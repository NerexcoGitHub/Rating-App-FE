import React from "react";
import { useRouter } from 'next/router'

const ButtonPrimary = () => {
  const router = useRouter()
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-orange-500 hover:shadow-orange-md transition-all outline-none " +
        ''
      }
      onClick={() => router.push('/add-prompt')}
    >
      ADD PROMPT
    </button>
  );
};

export default ButtonPrimary;
