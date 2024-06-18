import React from 'react'
interface MyCardProps {
   fact: string;
   name: string;
   lastName: string;
   photo: string;
   key: string;
   lastElementRef: any;
   onClick: any;
  }

const Card = ({fact, name, lastName, photo, key, lastElementRef, onClick}: MyCardProps) => {
  return (
    <button 
      className='flex flex-row p-5 m-3 border border-slate-300 rounded w-11/12 text-start'
      key={key} 
      ref={lastElementRef}
      onClick={onClick}
     >
        <img src={photo} className='inline-block h-12 w-12 rounded-full ring-2 ring-white mr-3' alt='profile-img'/>
        <div>
            <p className='text-base font-semibold'>{name} {lastName}</p>
            <p className='text-sm'>{fact}</p>
        </div>      
    </button>
  )
}

export default Card
