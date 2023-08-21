import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import User from './pages/User'

function App() {

    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="/:id" element={<User/>}/>
        </Routes>
    )
}

export default App