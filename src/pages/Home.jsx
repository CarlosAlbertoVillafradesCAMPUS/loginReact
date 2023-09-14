import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Home() {
    const location = useLocation()
  return (
    <div>
    <h2>{location.state.user.nickName} Bienvenido al home</h2>
    </div>
  )
}
