import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Onboarding from './Pages/Onboarding';
import Contact from './Pages/Contact';
import Asking from './Pages/Asking';


const RoutingApp = () => {
    return ( 
        <>
        
        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Onboarding />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path='/Asking' element={<Asking />} />


            </Routes>

        </BrowserRouter>

        
         
        
        
        </>
     );
}
 
export default RoutingApp;