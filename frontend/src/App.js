import React from 'react';
import {
  ChakraProvider,
  
  theme,
} from '@chakra-ui/react';

import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react';
import Login from './components/login/Login';
import Notfound from './components/Notfound';
import Navbar from './components/navbar/navbar';
import Quiz from './components/Quiz';
import Profile from './components/Profile';

export const usercontext = createContext(null);
function App() {

  const [loading, setloading] = useState(true);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Navbar />
        <usercontext.Provider value={{loading, setloading}}>
          <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/profile'} element={<Profile/>}></Route>
            <Route path={'*'} element={<Notfound/>}></Route>
            <Route path={'/quiz/:id'} element={<Quiz/>}></Route>
          </Routes>
        </usercontext.Provider>

      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
