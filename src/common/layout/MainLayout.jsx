/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import * as S from './styles/Styles'
import Navbar from './Navbar'
import Footer from './Footer'

function MainLayout({children}) {
  return (
      <S.LayoutHolder className='container'>
          <Navbar />
          {children}
          <Footer />
      </S.LayoutHolder>
  )
}

export default MainLayout