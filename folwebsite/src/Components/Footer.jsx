import React, { Component } from 'react';


import './Footer.css';

import { FacebookLogo, InstagramLogo, YoutubeLogo, CaretUpIcon  } from "@phosphor-icons/react";

import logo from '../Assets/Icons/logo.svg'; 
  
const Footer = () => {

    const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // This creates a professional, slow glide up
    });
};


    return ( 
        <footer>

            <div className='foorterTop'>
                <img className='footerLogo' src={logo} alt="logo" />
                <div className='footerColumn'>
                    <h5>عن فل</h5>
                    <p>كيف بدأنا</p>
                    <p>رسالة فل</p>
                    <p>أيادينا المصرية</p>
                </div>

                <div className='footerColumn'>
                    <h5>تسوق مشتلنا</h5>
                    <p>نباتات داخلية</p>
                    <p>نباتات خارجية</p>
                    <p>نباتات مثمرة</p>
                    <p>نباتات عطرية</p>
                </div>

                <div className='footerColumn'>
                    <h5>خدمات فل</h5>
                    <p>استشارات واقعية وافتراضية</p>
                    <p>الرحلة تبدأ بعد الشراء</p>
                    <p>العناية أثناء غيابك</p>
                    <p>تنسيق الحدائق</p>
                    <p>تنسيق الهدايا</p>
                </div>

                <div className='footerColumn'>
                    <h5>تطبيق فل</h5>
                    <h5>الوظائف</h5>
                    <h5>الاستدامة</h5>
                    <h5>اسأل خبيرًا</h5>
                </div>
            </div>

            <hr />

            <div className='footerBottom'>

                <div className='footerBottRight'>

                <div className='newsCont'>
                    <h5>اشترك في نشرتنا الأسبوعية لتصلك كل التحديثات</h5>
                    <div className='newsInputCont'>
                        <input type="text" placeholder='البريد الإلكتروني' />
                        <button class="subscribe-btn">اشترك الآن</button>
                        
                    </div>
                </div>

                <div className='footerColumn'>
                    <h5>تواصل مع فل</h5>
                    <p>+20 10236589809</p>

                    <div className='socilaCont'>
                        {/* <img src="" alt="" /> */}
                        <FacebookLogo size={32} color="#fafaea" />
                        <InstagramLogo size={32} color="#fafaea" />
                        <YoutubeLogo size={32} color="#fafaea" />
                    </div>
                </div>

                </div>

                <div className='topArrow' onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                    <div className='arrow'> <CaretUpIcon size={32} color="#fafaea" /> </div>
                    <p>عد إلى البداية</p>
                </div>

            </div>

        </footer>
     );
}
 
export default Footer;