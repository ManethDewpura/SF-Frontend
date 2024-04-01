import React from 'react'

const AcceptButton= ({onclick,className,children}) =>  {

  return (
    <button onclick={onclick} className={`flex items-center justify-between px-4 py-2 bg-orange-600 text-white rounded-md shadow-md focus:outline-none focus:rin-2 focus:ring-blue-600 ${className}`}>
        <span className="mr-2">{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>



    </button>
  )
}

export default AcceptButton;