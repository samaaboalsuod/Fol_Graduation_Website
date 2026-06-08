import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash } from '@phosphor-icons/react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import MainButton from '../Components/MainButton';
import SecondButton from '../Components/SecondButton';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.Price) || 0), 0);
    const shipping = cartItems.length > 0 ? 50 : 0;
    const total = subtotal + shipping;

    return (
        <div className="cartPageWrapper" dir="rtl">
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>

            <div className="cartPageContent">
                <h1 className="cartPageTitle">سلة المشتريات</h1>

                {cartItems.length === 0 ? (
                    <div className="cartPageEmpty">
                        <div className="emptyIcon">🛒</div>
                        <h2>سلتك فارغة</h2>
                        <p>يبدو أنك لم تقم بإضافة أي نباتات إلى سلتك بعد.</p>
                        <SecondButton 
                            text="تصفح المتجر" 
                            onClick={() => navigate('/Shop')} 
                            className="cartPageShopBtn"
                        />
                    </div>
                ) : (
                    <div className="cartPageGrid">
                        <div className="cartItemsCol">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cartPageItemCard">
                                    <div className="cartPageItemImgBox">
                                        <img 
                                            src={item.Hero_Showcase_Photo} 
                                            alt={item.NameAR} 
                                            className="cartPageItemImg"
                                        />
                                    </div>
                                    <div className="cartPageItemDetails">
                                        <h3>{item.NameAR}</h3>
                                        <p className="cartPageItemPrice"><span>{item.Price}</span> جنيه</p>
                                    </div>
                                    <button 
                                        className="cartPageRemoveBtn" 
                                        onClick={() => removeFromCart(item.id)}
                                        title="إزالة من السلة"
                                    >
                                        <Trash size="1.8rem" color="#ff4d4f" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cartSummaryCol">
                            <div className="cartSummaryCard">
                                <h3>ملخص الطلب</h3>
                                <div className="summaryRow">
                                    <span>المجموع الفرعي:</span>
                                    <span>{subtotal} جنيه</span>
                                </div>
                                <div className="summaryRow">
                                    <span>رسوم التوصيل:</span>
                                    <span>{shipping} جنيه</span>
                                </div>
                                <div className="summaryDivider"></div>
                                <div className="summaryRow summaryTotal">
                                    <span>الإجمالي:</span>
                                    <span>{total} جنيه</span>
                                </div>
                                
                                <MainButton 
                                    text="متابعة الدفع" 
                                    className="cartPageCheckoutBtn"
                                    onClick={() => navigate('/Checkout')}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
};

export default CartPage;
