import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Onboarding from './Pages/Onboarding';
import Contact from './Pages/Contact';


const RoutingApp = () => {
    return ( 
        <>
        
        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/Onboarding' element={<Onboarding />} />
                <Route path='/Contact' element={<Contact />} />


            </Routes>

        </BrowserRouter>

        
         
        
        
        </>
     );
}
 
export default RoutingApp;