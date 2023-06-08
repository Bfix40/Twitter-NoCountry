import React from 'react'

const Content = ({ content }) => {
  const palabras = content.split(/\s+/); // Separar el texto en palabras

  return (
      <p className='ml-2 dark:text-white max-sm:text-xs w-[90%]'>{
          palabras.map((palabra, index) =>
            palabra.startsWith("#") ? (
              <span key={index} className='text-[#1d9bf0]'>
                          {palabra}{" "}
                        </span>
            ) : `${palabra} `
          )}</p>
  )
};
export default Content
