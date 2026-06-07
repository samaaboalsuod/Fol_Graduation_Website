import React from 'react';
import { ArrowUpRight, BookmarkSimple, ShoppingCart } from "@phosphor-icons/react";
import arLink from '../Assets/Icons/arLink.png';
import './PlantMatchCard.css';

const PlantMatchCard = ({ plant, matchType }) => {
    const isPerfect = matchType === 'perfect';
    
    // Plant info mapping
    const title = plant?.NameAR || 'اسم النبات';
    const category = plant?.Category || 'نبات داخلي';
    const price = plant?.Price ? `${plant.Price} ج.م` : '85 ج.م';
    const description = plant?.DescriptionAR || 'نبات رائع يضيف لمسة جمالية لمنزلك، يتميز بسهولة العناية وتأقلمه مع مختلف الظروف.';
    const modelSrc = plant?.['3DModel'] || ''; 
    const commonName = plant?.NameEN ? `الاسم الشائع: ${plant.NameEN}` : '';

    return (
        <div className={`plantMatchCard ${isPerfect ? 'perfectMatch' : 'goodMatch'}`} dir="rtl">
            {isPerfect ? (
                // PERFECT MATCH LAYOUT
                <div className="pmcPerfectContainer">
                    <div className="pmcRightCol">
                        <div className="pmcTopActions">
                            <button className="pmcIconBtn">
                                <ArrowUpRight size={20} weight="light" color="#fff" />
                            </button>
                            <button className="pmcIconBtn">
                                <BookmarkSimple size={20} weight="light" color="#fff" />
                            </button>
                        </div>
                        
                        <div className="pmcTextContent">
                            <span className="pmcCategory">الفئة: {category}</span>
                            <h2 className="pmcTitle">{title}</h2>
                            {commonName && <p className="pmcCommonName">{commonName}</p>}
                            <p className="pmcDescription">{description}</p>
                            <p className="pmcPricePerfect">{price}</p>
                        </div>

                        <div className="pmcArBoxWrapper">
                            <div className="pmcArLinkBox">
                                <div className="arBoxText">
                                    <h4>شاهد في منزلك</h4>
                                    <p>تحقق من حجم وشكل النبات التقريبي على أرض الواقع عبر الواقع المعزز AR</p>
                                </div>
                                <div className="arBoxQr">
                                    <img src={arLink} alt="AR QR Code" className="qrCodeImg" />
                                    <span>امسح الكود بهاتفك</span>
                                </div>
                            </div>
                        </div>

                        <div className="pmcFooterButtons">
                            <button className="pmcPrimaryBtn">
                                <ShoppingCart size={20} weight="fill" /> أضف للسلة
                            </button>
                            <button className="pmcSecondaryBtn">احصل عليه الآن</button>
                        </div>
                    </div>

                    <div className="pmcCenterCol">
                        <model-viewer 
                            src={modelSrc} 
                            alt={title}
                            auto-rotate 
                            camera-controls 
                            disable-zoom
                            class="pmcModelViewer"
                        ></model-viewer>
                    </div>

                    <div className="pmcLeftCol">
                        <div className="badgePerfect">
                            اقتراح مثالي
                        </div>
                        <div className="pmcGallery">
                            <div className="galleryImg" style={{backgroundImage: "url('/Assets/Icons/Leaf1.png')"}}></div>
                            <div className="galleryImg" style={{backgroundImage: "url('/Assets/Icons/Leaf2.png')"}}></div>
                            <div className="galleryImg" style={{backgroundImage: "url('/Assets/Icons/Leaf3.png')"}}></div>
                        </div>
                    </div>
                </div>
            ) : (
                // GOOD MATCH LAYOUT
                <div className="pmcGoodContainer">
                    <div className="pmcGoodHeader">
                        <div className="pmcTopActions">
                            <button className="pmcIconBtn">
                                <ArrowUpRight size={20} weight="light" color="#fff" />
                            </button>
                            <button className="pmcIconBtn">
                                <BookmarkSimple size={20} weight="light" color="#fff" />
                            </button>
                        </div>
                        <div className="badgeGood">
                            اقتراح جيد
                        </div>
                    </div>

                    <div className="pmcGoodText">
                        <span className="pmcCategory">الفئة: {category}</span>
                        <h2 className="pmcTitle">{title}</h2>
                        {commonName && <p className="pmcCommonName">{commonName}</p>}
                        <p className="pmcGoodDesc">{description}</p>
                    </div>

                    <div className="pmcGoodModel">
                        <model-viewer 
                            src={modelSrc} 
                            alt={title}
                            auto-rotate 
                            camera-controls 
                            disable-zoom
                            class="pmcModelViewer"
                        ></model-viewer>
                    </div>

                    <div className="pmcGoodFooter">
                        <p className="pmcPriceGood">{price}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlantMatchCard;
