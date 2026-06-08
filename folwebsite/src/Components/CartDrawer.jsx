import React from 'react';
import { useCart } from '../CartContext';
import { X, Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import MainButton from './MainButton';
import SecondButton from './SecondButton';
import './CartDrawer.css';

const CartDrawer = () => {
    const { cartItems, isCartOpen, closeCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (Number(item.Price) || 0), 0);
    };

    return (
        <>
            {/* Backdrop overlay */}
            <div 
                className={`cartDrawerOverlay ${isCartOpen ? 'open' : ''}`} 
                onClick={closeCart}
            />

            {/* The actual sliding drawer */}
            <div className={`cartDrawerCont ${isCartOpen ? 'open' : ''}`} dir="rtl">
                <div className="cartDrawerHeader">
                    <h2>سلة المشتريات</h2>
                    <button className="cartDrawerCloseBtn" onClick={closeCart}>
                        <X size="2rem" />
                    </button>
                </div>

                <div className="cartDrawerBody">
                    {cartItems.length === 0 ? (
                        <div className="cartDrawerEmpty">
                            <p>سلتك فارغة حالياً.</p>
                            <p>استكشف متجرنا وأضف ما يعجبك!</p>
                            <SecondButton 
                                text="تصفح المتجر" 
                                onClick={() => {
                                    closeCart();
                                    navigate('/Shop');
                                }}
                                className="cartShopBtn"
                            />
                        </div>
                    ) : (
                        <div className="cartItemsList">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cartItemCard">
                                    <div className="cartItemImgBox">
                                        <img 
                                            src={item.Hero_Showcase_Photo} 
                                            alt={item.NameAR} 
                                            className="cartItemImg"
                                        />
                                    </div>
                                    <div className="cartItemDetails">
                                        <h4 className="cartItemName">{item.NameAR}</h4>
                                        <div className="cartItemPrice">
                                            <span>{item.Price}</span> جنيه
                                        </div>
                                    </div>
                                    <button 
                                        className="cartItemRemoveBtn" 
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash size="1.5rem" color="#ff4d4f" weight="regular" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cartDrawerFooter">
                        <div className="cartTotalRow">
                            <span className="cartTotalLabel">الإجمالي:</span>
                            <span className="cartTotalValue">
                                {calculateTotal()} جنيه
                            </span>
                        </div>
                        <MainButton 
                            className="cartCheckoutBtn" 
                            text="إتمام الطلب" 
                            onClick={() => {
                                closeCart();
                                navigate('/Checkout');
                            }} 
                        />
                        <SecondButton 
                            className="cartShopBtn"
                            text="عرض السلة"
                            onClick={() => {
                                closeCart();
                                navigate('/Cart');
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
