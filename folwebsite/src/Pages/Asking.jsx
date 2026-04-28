import React, { useState, useEffect } from 'react';
import { supabase } from '../Supabase.jsx';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import SectionTitles from '../Components/SectionTitles';
import ActionCard from '../Components/ActionCard';
import ChatHistory from '../Components/ChatHistory';
import FAQFilter from '../Components/FAQFilter';
import FAQItem from '../Components/FAQItem';
import Footer from '../Components/Footer.jsx';

import heroBg from '../Assets/Icons/heroBg.png';
import './Asking.css';

const Asking = () => {
    const [titleData, setTitleData] = useState(null);
    const [services, setServices] = useState([]);
    const [history, setHistory] = useState([]);
    const [activeFaqCategory, setActiveFaqCategory] = useState('all');

    const faqData = [
        { 
            id: 1, 
            questionar: 'كيف نروي النباتات بشكل صحيح؟', 
            answerar: 'القاعدة الذهبية هي ري النبات عند جفاف الطبقة السطحية من التربة (بعمق 2-3 سم). استخدم مياهاً فاترة، وصب الماء ببطء حتى يبدأ بالخروج من فتحات التصريف في الأسفل للتأكد من وصوله للجذور. تجنب ري النبات يومياً دون التأكد من حاجته، لأن كثرة الماء قد تؤدي لتعفن الجذور.',
            category: 'watering'
        },
        { 
            id: 2, 
            questionar: 'ما هي أفضل طرق العناية بالنباتات الداخلية؟', 
            answerar: 'تعتمد العناية الناجحة على ثلاثة محاور: الإضاءة (وضع النبات في مكان تصله إضاءة ساطعة ولكن بعيداً عن شمس الظهيرة)، التهوية (وجود تيار هوائي متجدد دون تعريض المكيف المباشر)، والنظافة (مسح الأوراق بقطعة قماش مبللة بانتظام لإزالة الغبار).',
            category: 'lighting'
        },
        { 
            id: 3, 
            questionar: 'كيف يمكننا حماية النباتات من الآفات؟', 
            answerar: 'الوقاية هي المفتاح! تفقد أوراق وسيقان نباتك مرة في الأسبوع للبحث عن أي علامات غريبة. إذا لاحظت وجود حشرات صغيرة، يمكنك مسح الأوراق بمحلول مخفف من الماء والصابون الطبيعي. حافظ أيضاً على رطوبة معتدلة حول النبات، لأن الهواء الجاف جداً يجذب بعض أنواع الآفات مثل "العنكبوت الأحمر".',
            category: 'pests'
        },
        { 
            id: 4, 
            questionar: 'ما هي النباتات المناسبة للزراعة في المناخ الصحراوي؟', 
            answerar: 'للمناخ الصحراوي، نوصي بالنباتات التي تتحمل الجفاف والحرارة. داخلياً، يُعد "البوتس" خياراً ممتازاً لمرونته، كما تعتبر الصباريات بأنواعها، ونبات "جلد النمر" (Sansevieria)، ونبات "الزاميا" من أفضل الخيارات التي تزدهر في الأجواء الحارة والجافة دون الحاجة لعناية مستمرة.',
            category: 'pests'
        }
    ];

    const filteredFaq = activeFaqCategory === 'all' 
        ? faqData 
        : faqData.filter(item => item.category === activeFaqCategory);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Hero Title (id 11)
            const { data: title } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 11)
                .single();
            
            if (title) setTitleData(title);

            // Fetch Asking Services
            const { data: servicesData } = await supabase
                .from('Asking_Service')
                .select('*')
                .order('id', { ascending: true });
            
            if (servicesData) setServices(servicesData);

            // Fetch Chat History
            const { data: historyData } = await supabase
                .from('webchathistory')
                .select('*')
                .order('id', { ascending: true });
            
            if (historyData) setHistory(historyData);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>
                    
            <div className="heroBgLayer">
                <img src={heroBg} alt="Background" className="bgImg" />
                <div className="greenOverlay"></div>
                <div className="blurLayer"></div>
            </div>

            <div className="pageContent">
                <div className="heroTitleCont">
                    {titleData && (
                        <PageTitle 
                            title={titleData.Title} 
                            subtitle={titleData.SubTitle}
                            discription={titleData.Description} 
                        />
                    )}
                </div>

                {/* Asking Services Section */}
                <section className="generalSec servicesSec">
                    <SectionTitles title="اختر كيف تريد أن تسألنا" />
                    
                    <div className="cardsContainer">
                        {services.map((service) => (
                            <ActionCard 
                                key={service.id}
                                id={service.NameAR === 'اسأل خبيرًا' ? 'ask-expert' : undefined}
                                title={service.NameAR}
                                subtitle={service.CardTagAR}
                                discription={service.AppDisc}
                                features={service.FeaturesAR}
                                icon={service.HIcon}
                                iconAlt={service.alt}
                                isHighlighted={service.IsRecommended}
                                btnText={service.BtnTextAR}
                                onClick={() => console.log(`Selected service: ${service.NameAR}`)}
                            />
                        ))}
                    </div>
                </section>

                {/* Chat History Section */}
                <ChatHistory history={history} />

                {/* FAQ Section */}
                <section className="generalSec faqSec">
                    <SectionTitles title="الأسئلة الشائعة" />
                    
                    <FAQFilter 
                        activeCategory={activeFaqCategory} 
                        onCategoryChange={setActiveFaqCategory} 
                    />

                    <div className="faqList">
                        {filteredFaq.map((item, index) => (
                            <FAQItem 
                                key={item.id} 
                                item={item} 
                                index={index} 
                            />
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}

export default Asking;

