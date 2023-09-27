import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, size, type='primary', onClick }) {

  const sizeStyle= size === 'small' ? 'px-3 py-1.5 text-xs sm:px-5 sm:py-2.5' : size === 'rounded' ? ' px-2.5 py-1  sm:px-3.5 sm:py-2 text-sm ' : size === 'large' ? ' lg:px-20 lg:py-9 lg:text-3xl px-4 py-3 text-base text-sm ' : size === 'medium' ?  'px-4 py-3 text-base text-sm' : 'px-4 py-3 text-base text-sm lg:px-10 lg:py-4 lg:text-xl';

  const typeStyle = type === 'secondary' ? ' opacity-60 border-2 border-stone-300  hover:bg-stone-300 hover:text-stone-800 focus:ring-stone-700 focus:bg-stone-300 focus:text-stone-800 focus:ring focus:ring-stone-200  focus:opacity-100 hover:opacity-100 ' : 'bg-yellow-400 hover:bg-yellow-300 focus:ring-yellow-300';

  const className =
    `inline-block rounded-full font-semibold uppercase text-stone-800  transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed  disabled:opacity-50 ${sizeStyle} ${typeStyle}`;

  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
