import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Onboarding from './Pages/Onboarding';


const RoutingApp = () => {
    return ( 
        <>
        
        <BrowserRouter>

            <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/Onboarding' element={<Onboarding />} />


            </Routes>

        </BrowserRouter>

        
         
        
        
        </>
     );
}
 
export default RoutingApp;