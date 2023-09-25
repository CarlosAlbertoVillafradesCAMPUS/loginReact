import React from 'react'
import robot from "../assets/robotVerde-removebg-preview.png"
import "../styles/Home.css"
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='principalNot'>
    <div className='infoHome'>
      <div className='contTextError'>
      <div>
        <img src={robot} />
      </div>
        <p className='textError'>ERROR 404</p>
        <p className='notFound'>Page Not Found</p>
      </div>
      <br />
      <br />
      <div className='containerButtonHome'>
      <Link to={"/"} className='volver'>Regresar</Link>
      </div>
    </div>
    </div>
  )
}
