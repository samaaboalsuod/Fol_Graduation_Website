import React from 'react';
import ValuesCard from '../Components/ValuesCard';
import { ShieldCheck, Fingerprint, Recycle, Brain, Headset, Lightbulb } from '@phosphor-icons/react';
import './AboutValues.css';

const AboutValues = () => {
    return (
        <section className="generalSec valuesSection">
            <h3 className="section-main-title valuesMainTitle">قيمنا ومبادئنا</h3>
            
            <div className="valuesGrid" dir="rtl">
                
                <ValuesCard 
                    title="الصدق والشفافية"
                    description="نخبرك الحقيقة حول كل نبات، حتى لو كان ذلك يعني أنه غير مناسب لك."
                    IconComponent={ShieldCheck}
                />

                <ValuesCard 
                    title="التفرد والتنوع"
                    description="نحن نقدم لك مجموعة متنوعة من النباتات التي تعكس جمال الطبيعة الفريد لكل بيئة."
                    IconComponent={Fingerprint}
                />

                <ValuesCard 
                    title="الاستدامة"
                    description="نحرص على استخدام ممارسات مستدامة في زراعة النباتات، مما يساهم في حماية البيئة."
                    IconComponent={Recycle}
                />

                <ValuesCard 
                    title="المعرفة والخبرة"
                    description="فريقنا يتكون من خبراء في مجال البستنة، مستعدون لمساعدتك في اختيار الأنسب."
                    IconComponent={Brain}
                    flipped={true}
                />

                <ValuesCard 
                    title="الدعم المستمر"
                    description="نوفر لك الدعم والإرشادات اللازمة لضمان نجاح نباتاتك في بيئتك."
                    IconComponent={Headset}
                    flipped={true}
                />

                <ValuesCard 
                    title="الابتكار"
                    description="نقدم تقنيات جديدة ومبتكرة للعناية بالنباتات، لتسهيل تجربتك في الزراعة."
                    IconComponent={Lightbulb}
                    flipped={true}
                />

            </div>
        </section>
    );
};

export default AboutValues;
