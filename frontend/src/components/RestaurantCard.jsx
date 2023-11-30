import React from 'react'
import { IoIosSearch } from "react-icons/io";
//import './RestaurantList'
import { RiMotorbikeFill } from "react-icons/ri";
import { BsPatchExclamation } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { IoMdStopwatch } from "react-icons/io";


const RestaurantCard = ({ restaurant }) => {
    //const {name, category, image} = restaurant;

  return (
    <>
    <div className='pretzel'> 
      <img src='frontend\src\assets\images\pretzel.svg' />
    </div>
    <section className='restaurant-store'>
      <div className='logo-contenidor'>
          <img src='' alt='logo'/>
          <h2>{name}</h2>
          
          <div className='icons'>
            <div><BiLike /><br/>80%</div>
            <div><RiMotorbikeFill /><br/>30-40'</div>
            <div><IoMdStopwatch /><br/>GRATIS</div>
            <div><BsPatchExclamation /><br/>Premium</div>
            <br/>
            
        </div> 
          <p>slogan</p>
          
      </div>
      <br/>
      <div>
      
    </div>
    
      
        <div className='navigation-bar'><button><IoIosSearch /></button><input placeholder='Busca tus platos favoritos'></input></div>
    
    
       
    </section>
    

    </>
    
  )
}

export default RestaurantCard;