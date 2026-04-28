import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight, Sun, CloudSun, SunHorizon, Desktop, Armchair, House, BatteryLow, BatteryMedium, BatteryHigh, Plant, PottedPlant, Tree, Sparkle, Wind, Flower, PawPrint, Prohibit } from "@phosphor-icons/react";
import OnboardingProgressBar from '../Components/OnboardingProgressBar';
import OnboardingCard from '../Components/OnboardingCard';
import SecondButton from '../Components/SecondButton';
import logo from '../Assets/Icons/logo.svg';
import './Questions.css';

const Questions = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({});

    const steps = [
        {
            id: 1,
            question: 'ما مستوى الإضاءة الطبيعية في المكان؟',
            options: [
                { id: 'high_direct', label: 'إضاءة قوية', desc: '(أشعة شمس مباشرة)', icon: <Sun size={42} weight="light" /> },
                { id: 'medium_indirect', label: 'إضاءة متوسطة', desc: '(ضوء ساطع غير مباشر)', icon: <CloudSun size={42} weight="light" /> },
                { id: 'high_indirect', label: 'إضاءة قوية', desc: '(بدون شمس مباشرة)', icon: <SunHorizon size={42} weight="light" /> }
            ]
        },
        {
            id: 2,
            question: 'أين تنوي وضع النبات؟',
            options: [
                { id: 'small_surface', label: 'سطح صغير', desc: 'على مكتب أو رف', icon: <Desktop size={42} weight="light" /> },
                { id: 'floor_large', label: 'مساحة أرضية', desc: 'في زاوية أو نبات كبير', icon: <Armchair size={42} weight="light" /> },
                { id: 'outdoor_balcony', label: 'مساحة خارجية', desc: 'في شرفة أو فناء', icon: <House size={42} weight="light" /> }
            ]
        },
        {
            id: 3,
            question: 'كم من الوقت يمكنك تخصيصه للعناية؟',
            options: [
                { id: 'low_maintenance', label: 'وقت قليل جداً', desc: 'قد أنسى الري أحياناً', icon: <BatteryLow size={42} weight="light" /> },
                { id: 'medium_maintenance', label: 'وقت متوسط', desc: 'عناية أسبوعية منتظمة', icon: <BatteryMedium size={42} weight="light" /> },
                { id: 'high_maintenance', label: 'وقت كبير/مستمر', desc: 'أحب متابعة النبات يومياً', icon: <BatteryHigh size={42} weight="light" /> }
            ]
        },
        {
            id: 4,
            question: 'ما مستوى خبرتك في العناية؟',
            options: [
                { id: 'beginner', label: 'مبتدئ', desc: 'هذه أول تجربة لي', icon: <Plant size={42} weight="light" /> },
                { id: 'intermediate', label: 'لدي خبرة بسيطة', desc: 'أعرف الأساسيات', icon: <PottedPlant size={42} weight="light" /> },
                { id: 'advanced', label: 'خبير', desc: 'أحب التحديات والنباتات', icon: <Tree size={42} weight="light" /> }
            ]
        },
        {
            id: 5,
            question: 'ما الهدف الأساسي من اقتناء النبات؟',
            options: [
                { id: 'decorative', label: 'للزينة', desc: 'لمسة جمالية للمكان', icon: <Sparkle size={42} weight="light" /> },
                { id: 'air_purifying', label: 'تنقية الهواء', desc: 'لبيئة صحية أكثر', icon: <Wind size={42} weight="light" /> },
                { id: 'aromatic_edible', label: 'نبات عطري', desc: 'للاستخدام المنزلي', icon: <Flower size={42} weight="light" /> }
            ]
        },
        {
            id: 6,
            question: 'هل يوجد حيوانات أليفة في المنزل؟',
            options: [
                { id: 'pet_friendly_required', label: 'نعم', desc: 'أحتاج نباتات آمنة', icon: <PawPrint size={42} weight="light" /> },
                { id: 'any', label: 'لا', desc: 'لا توجد قيود', icon: <Prohibit size={42} weight="light" /> }
            ]
        }
    ];

    const handleSelect = (optionId) => {
        setSelections({ ...selections, [currentStep]: optionId });
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log('Quiz complete:', selections);
            // navigate('/Results'); 
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="questionsPage">
            <div className="questionsHeader">
                <img src={logo} alt="Fol Logo"  />
                <button className="qBackBtn" onClick={prevStep}>
                    <span>السابق</span>
                    <CaretLeft size={20} weight="thin" />
                </button>
                
            </div>

            <div className="questionsContent">
                <OnboardingProgressBar total={steps.length} current={currentStep} />
                
                <h1 className="questionsText">{steps[currentStep].question}</h1>

                <div className="answersRow">
                    {steps[currentStep].options.map((opt) => (
                        <OnboardingCard
                            key={opt.id}
                            icon={opt.icon}
                            label={opt.label}
                            desc={opt.desc}
                            isSelected={selections[currentStep] === opt.id}
                            onClick={() => handleSelect(opt.id)}
                        />
                    ))}
                </div>
            </div>

            <div className="questionsFooter">
                <SecondButton 
                    className="qNextBtn" 
                    onClick={nextStep}
                    text={
                        <>
                            <CaretRight size={20} weight="bold" />
                            <span>{currentStep === steps.length - 1 ? 'شاهد الاقتراحات' : 'التالي'}</span>
                        </>
                    }
                />
                <button className="qSkipBtn" onClick={nextStep}>تخطي السؤال</button>
            </div>
        </div>
    );
};

export default Questions;
