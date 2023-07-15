import React from 'react'
import './Header.css'
import Topbar from '../Topbar/Topbar'
import NavBar from '../NavBar/NavBar'
import Landing from '../Landing/Landing'

export default function Header() {
  return (
    <div>
        <Topbar />
        <NavBar />
        <Landing />
    </div>
  )
}
