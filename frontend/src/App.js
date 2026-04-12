import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Feed from './components/Feed'
import Videodetail from './components/Videodetail'
import Channeldetail from './components/Channeldetail'
import Searchfeed from './components/Searchfeed'
import LoginPage from './components/LoginPage'
import SignUP from './components/SignUp'
import NoteState from './context/NoteState'
import Savevideo from './components/Savevideo'

const App = () => {
  return (
    <NoteState>
      <BrowserRouter>
        <div className="bg-dark min-h-screen text-white font-sans animate-fade-in">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" exact element={<Videodetail />} />
            <Route path="/channel/:id" exact element={<Channeldetail />} />
            <Route path="/search/:searchTerm" exact element={<Searchfeed />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUP />} />
            <Route path="/save" exact element={<Savevideo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  )
}

export default App
