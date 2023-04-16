import React from 'react'
import SideBar from './SideBar'

function Layout({children}) {
  return (
    <div className='layout'>
      <SideBar ></SideBar>
      <main className='main'>{children}</main>
    </div>
  )
}

export default Layout