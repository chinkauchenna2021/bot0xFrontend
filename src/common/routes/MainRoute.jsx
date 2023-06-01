/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from '../pages/Home'

function MainRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}   />
           </Routes>
        </BrowserRouter>

  )
}

export default MainRoute