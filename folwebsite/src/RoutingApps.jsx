import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import AuthModal from './Components/AuthModal';
import CartDrawer from './Components/CartDrawer';

import Home from './Pages/Home';
import Onboarding from './Pages/Onboarding';
import Questions from './Pages/Questions';
import Contact from './Pages/Contact';
import Asking from './Pages/Asking';
import ServiceDetail from './Pages/ServiceDetail';
import Shop from './Pages/Shop';
import Suggestions from './Pages/Suggestions';
import PlantDetail from './Pages/PlantDetail';
import About from './Pages/About';
import Save from './Pages/Save';
import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';


const RoutingApp = () => {
    return ( 
        <>
        
        <AuthProvider>
        <CartProvider>
            <AuthModal />
            <BrowserRouter>
                <CartDrawer />

                <Routes>

                    <Route path='/' element={<Onboarding />} />
                    <Route path='/Questions' element={<Questions />} />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/Contact' element={<Contact />} />
                    <Route path='/Asking' element={<Asking />} />
                    <Route path='/ServiceDetail/:id' element={<ServiceDetail />} />
                    <Route path='/Shop' element={<Shop />} />
                    <Route path='/Suggestions' element={<Suggestions />} />
                    <Route path='/Plant/:id' element={<PlantDetail />} />
                    <Route path='/About' element={<About />} />
                    <Route path='/Save' element={<Save />} />
                    <Route path='/Cart' element={<CartPage />} />
                    <Route path='/Checkout' element={<Checkout />} />


                </Routes>

            </BrowserRouter>
        </CartProvider>
        </AuthProvider>

        
         
        
        
        </>
     );
}
 
export default RoutingApp;