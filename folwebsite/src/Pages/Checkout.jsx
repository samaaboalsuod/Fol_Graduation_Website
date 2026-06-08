import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import MainButton from '../Components/MainButton';
import SecondButton from '../Components/SecondButton';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        city: '',
        address: ''
    });

    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.Price) || 0), 0);
    const shipping = cartItems.length > 0 ? 50 : 0;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        // Visual simulation of checkout completion
        setTimeout(() => {
            setIsSuccess(true);
            clearCart();
        }, 800);
    };

    if (isSuccess) {
        return (
            <div className="checkoutWrapper" dir="rtl">
                <div className="navOverlay">
                    <Nav hideWave={true} />
                </div>
                <div className="checkoutContent successState">
                    <div className="successCard">
                        <CheckCircle size={100} color="#1DBF53" weight="fill" className="successIcon" />
                        <h2>تم استلام طلبك بنجاح!</h2>
                        <p>شكرًا لتسوقك من فل. سنقوم بالتواصل معك قريباً لتأكيد تفاصيل الشحن.</p>
                        <MainButton 
                            text="العودة للصفحة الرئيسية" 
                            onClick={() => navigate('/Home')} 
                            className="backHomeBtn"
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (cartItems.length === 0 && !isSuccess) {
        return (
            <div className="checkoutWrapper" dir="rtl">
                <div className="navOverlay">
                    <Nav hideWave={true} />
                </div>
                <div className="checkoutContent emptyState">
                    <h2>عذراً، لا يمكن إتمام الطلب</h2>
                    <p>سلة المشتريات فارغة.</p>
                    <SecondButton text="العودة للمتجر" onClick={() => navigate('/Shop')} />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="checkoutWrapper" dir="rtl">
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>

            <div className="checkoutContent">
                <div className="checkoutHeader">
                    <button className="backLink" onClick={() => navigate(-1)}>
                        <ArrowRight size={20} />
                        <span>العودة</span>
                    </button>
                    <h1 className="checkoutTitle">إتمام الطلب</h1>
                </div>

                <div className="checkoutGrid">
                    {/* Form Column */}
                    <div className="checkoutFormCol">
                        <div className="checkoutSectionCard">
                            <h2>معلومات الشحن</h2>
                            <form className="checkoutForm" onSubmit={handleCheckout} id="checkout-form">
                                <div className="formGroup">
                                    <label>الاسم الكامل</label>
                                    <input 
                                        type="text" 
                                        name="fullName" 
                                        required 
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="الاسم الثلاثي"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>رقم الهاتف</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        required 
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="01xxxxxxxxx"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>المدينة</label>
                                    <select name="city" required value={formData.city} onChange={handleInputChange}>
                                        <option value="">اختر المدينة</option>
                                        <option value="cairo">القاهرة</option>
                                        <option value="giza">الجيزة</option>
                                        <option value="alex">الإسكندرية</option>
                                        <option value="other">محافظات أخرى</option>
                                    </select>
                                </div>
                                <div className="formGroup">
                                    <label>العنوان التفصيلي</label>
                                    <textarea 
                                        name="address" 
                                        required 
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="المنطقة، الشارع، رقم العمارة، رقم الشقة"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="checkoutSectionCard">
                            <h2>طريقة الدفع</h2>
                            <div className="paymentMethods">
                                <label className="paymentRadio active">
                                    <input type="radio" name="payment" checked readOnly />
                                    <span>الدفع عند الاستلام (COD)</span>
                                </label>
                                <label className="paymentRadio disabled">
                                    <input type="radio" name="payment" disabled />
                                    <span>البطاقة الائتمانية (قريباً)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Summary Column */}
                    <div className="checkoutSummaryCol">
                        <div className="checkoutSummaryCard">
                            <h2>ملخص الطلب</h2>
                            
                            <div className="checkoutItemsList">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="checkoutItemRow">
                                        <div className="checkoutItemImgBox">
                                            <img src={item.Hero_Showcase_Photo} alt={item.NameAR} />
                                        </div>
                                        <div className="checkoutItemDetails">
                                            <h4>{item.NameAR}</h4>
                                            <p>{item.Price} جنيه</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="checkoutDivider"></div>

                            <div className="checkoutSummaryRow">
                                <span>المجموع الفرعي</span>
                                <span>{subtotal} جنيه</span>
                            </div>
                            <div className="checkoutSummaryRow">
                                <span>رسوم التوصيل</span>
                                <span>{shipping} جنيه</span>
                            </div>
                            
                            <div className="checkoutDivider"></div>
                            
                            <div className="checkoutSummaryRow checkoutTotalRow">
                                <span>الإجمالي</span>
                                <span>{total} جنيه</span>
                            </div>

                            <MainButton 
                                text="تأكيد الطلب" 
                                className="placeOrderBtn"
                                onClick={() => document.getElementById('checkout-form').requestSubmit()}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Checkout;
