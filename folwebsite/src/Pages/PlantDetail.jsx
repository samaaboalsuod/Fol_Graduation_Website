import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';
import CareBlock from '../Components/CareBlock';
import { Sun, Drop, Sparkle, WaveSine, Plant } from '@phosphor-icons/react';
import arLink from '../Assets/Icons/arLink.png';

import './PlantDetail.css';

const PlantDetail = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('15');
    const scrollContainerRef = React.useRef(null);

    // Convert vertical scroll to horizontal scroll
    useEffect(() => {
        const handleWheel = (e) => {
            if (scrollContainerRef.current) {
                // If scrolling vertically, translate to horizontal scroll
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    // Flipped direction based on user request
                    scrollContainerRef.current.scrollLeft += e.deltaY;
                }
            }
        };
        
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }
        
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [isLoading]);

    useEffect(() => {
        const fetchPlant = async () => {
            const { data, error } = await supabase
                .from('Plant')
                .select('*')
                .eq('id', id)
                .single();
            
            if (data) {
                setPlant(data);
            } else {
                console.error("Error fetching plant:", error);
            }
            setIsLoading(false);
        };

        fetchPlant();
    }, [id]);

    if (isLoading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EFEBD8' }}>جاري التحميل...</div>;
    }

    if (!plant) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EFEBD8' }}>لم يتم العثور على النبات</div>;
    }

    return (
        <div className="plantDetailPage" dir="rtl">
            <div className="pdNavWrapper">
                <Nav hideWave={true} />
            </div>

            <div className="horizontalScrollContainer" ref={scrollContainerRef}>
                {/* Screen 1: Overview */}
                <div className="scrollScreen screenOverview">
                    <div className="overviewRight">
                        <div className="pdTextTop">
                            <p className="pdCategory">الفئة: {plant.Category}</p>
                            <div className="pdTitleRow">
                                <h1 className="pdTitle">{plant.NameAR}</h1>
                                <span className="pdPrice">{plant.Price} ج.م</span>
                            </div>
                            <p className="pdCommonName">الاسم الشائع: {plant.Common_Names || plant.NameEN}</p>
                        </div>

                        <div className="pdSizeSection">
                            <p className="pdSizeTitle">حجم الإصيص:</p>
                            <div className="pdSizeRow">
                                <div className={`pdSizeOption ${selectedSize === '12' ? 'selected' : ''}`} onClick={() => setSelectedSize('12')}>
                                    <Plant size={24} weight={selectedSize === '12' ? 'fill' : 'regular'} />
                                    <span>12 سم</span>
                                </div>
                                <div className={`pdSizeOption ${selectedSize === '15' ? 'selected' : ''}`} onClick={() => setSelectedSize('15')}>
                                    <Plant size={24} weight={selectedSize === '15' ? 'fill' : 'regular'} />
                                    <span>15 سم</span>
                                </div>
                                <div className={`pdSizeOption ${selectedSize === '20' ? 'selected' : ''}`} onClick={() => setSelectedSize('20')}>
                                    <Plant size={24} weight={selectedSize === '20' ? 'fill' : 'regular'} />
                                    <span>20 سم</span>
                                </div>
                            </div>

                            <p className="pdHeights">
                                أقصى طول ممكن: <span>2 - 3 أمتار (عند توفر الدعم)</span><br/>
                                الطول المعتاد: <span>{plant.Height || '30 - 100 سم'}</span>
                            </p>
                        </div>

                        <div className="pdIdealBadge">
                            <span>مثالي</span>
                            لمكاتب العمل، الأرفف العالية، والمساحات التي تحتاج لمسة خضراء هادئة.
                        </div>
                        
                        {/* Decorative leaf for right side */}
                        <img src="/Assets/Icons/HeroDecor.png" alt="" className="pdDecoLeafRight" />
                    </div>

                    <div className="overviewLeft">
                        {plant.Hero_Showcase_Photo && (
                            <img src={plant.Hero_Showcase_Photo} alt={plant.NameAR} className="overviewPhotoFull" />
                        )}
                        <button className="pdAddCartBtnLeft">أضف للسلة</button>
                    </div>
                </div>

                {/* Screen 2: Care Instructions */}
                <div className="scrollScreen screenCare">
                    {/* Decorative images */}
                    {plant.Cover_Photo && (
                        <img src={plant.Cover_Photo} alt="Decor" className="careDecoTopLeft" />
                    )}
                    {plant.TaskPng && (
                        <img src={plant.TaskPng} alt="Decor" className="careDecoHanging" />
                    )}
                    {/* Note: if you have another photo for bottom right, use it here, else reuse or omit */}

                    <h2 className="careCenterText">كيف تعتني به؟</h2>

                    <div className="careGrid">
                        <CareBlock 
                            title="الإضاءة" 
                            description={plant.Care_Light_Details || 'يحب الضوء الساطع غير المباشر.'} 
                            icon={<Sun size={32} weight="light" />} 
                        />
                        <CareBlock 
                            title="الري" 
                            description={plant.Care_Water_Details || 'اسقه فقط عندما تجف التربة.'} 
                            icon={<Drop size={32} weight="light" />} 
                        />
                        <CareBlock 
                            title="التنظيف" 
                            description={plant.Care_Clean_Details || 'امسح الأوراق بقطعة قماش مبللة كل فترة.'} 
                            icon={<Sparkle size={32} weight="light" />} 
                        />
                        <CareBlock 
                            title="التسميد" 
                            description={plant.Care_Fertilizer_Details || 'قم بتسميده بمدعم مغذي متوازن مرة كل شهر.'} 
                            icon={<WaveSine size={32} weight="light" />} 
                        />
                    </div>
                </div>

                {/* Screen 3: AR View */}
                <div className="scrollScreen screenAR">
                    <div className="arLeft">
                        <model-viewer 
                            src={plant['3DModel']} 
                            alt={plant.NameAR}
                            auto-rotate 
                            camera-controls 
                            disable-zoom
                            class="pdModelViewer"
                        ></model-viewer>
                        <p className="arInstruction">شكل النبات بتقنية ثلاثي الأبعاد</p>
                    </div>

                    <div className="arRight">
                        <h4>شاهد في منزلك</h4>
                        <p>تحقق من حجم وشكل النبات التقريبي على أرض الواقع عبر الواقع المعزز AR</p>
                        <img src={arLink} alt="AR QR Code" className="pdQrCode" />
                        <span>امسح الكود بهاتفك</span>
                    </div>

                    {/* Optional deco leaves for AR screen */}
                    <img src="/Assets/Icons/HeroDecor.png" alt="" className="decoLeavesRight" style={{display: 'none'}} />
                </div>
            </div>

            <div className="pdFooterWrapper">
                <Footer />
            </div>
        </div>
    );
};

export default PlantDetail;
