import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Supabase';
import { useAuth } from '../AuthContext';
import Nav from '../Components/Nav';
import PageTitle from '../Components/PageTitle';
import Footer from '../Components/Footer';
import ShopCard from '../Components/ShopCard';
import MainButton from '../Components/MainButton';
import UserGroups from '../Components/UserGroups';
import JourneyHistoryCard from '../Components/JourneyHistoryCard';
import { getQuizSuggestions } from './Questions';

import heroBg from '../Assets/Icons/heroBg.png';
import './Save.css';

const Save = () => {
    const { user, isAuthModalOpen, requireAuth } = useAuth();
    const navigate = useNavigate();
    const [titleData, setTitleData] = useState(null);
    const [activeTab, setActiveTab] = useState('saved'); // 'saved' or 'journeys'

    // Saved Tab State
    const [savedPlants, setSavedPlants] = useState([]);
    const [groups, setGroups] = useState([]);
    const [activeGroup, setActiveGroup] = useState(null);
    const [filteredPlants, setFilteredPlants] = useState([]);

    // Journeys Tab State
    const [journeys, setJourneys] = useState([]);

    useEffect(() => {
        // If not logged in and not opening modal, redirect home or handle gracefully
        if (!user && !isAuthModalOpen) {
            // We shouldn't force redirect if the modal is open handling login
            // But if they cancel the modal, we go home
            // navigate('/Home');
        }

        const fetchTitle = async () => {
            const { data } = await supabase
                .from('PageTitle')
                .select('*')
                .eq('id', 27)
                .single();
            if (data) setTitleData(data);
        };

        const fetchSavedData = async () => {
            if (!user) return;
            // 1. Fetch saved items
            const { data: saves } = await supabase.from('SavedProduct').select('*').eq('user_id', user.id);
            if (saves && saves.length > 0) {
                const plantIds = saves.map(s => s.plant_id);
                const { data: plants } = await supabase.from('Plant').select('*').in('id', plantIds);
                if (plants) {
                    setSavedPlants(plants);
                    setFilteredPlants(plants); // Default show all
                }
            }

            // 2. Fetch User Groups
            const { data: userGroups } = await supabase.from('CollectionGroup').select('*').eq('user_id', user.id);
            if (userGroups) setGroups(userGroups);

            // 3. Fetch Quiz Journeys
            const { data: userJourneys } = await supabase.from('QuizJourney').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
            if (userJourneys) setJourneys(userJourneys);
        };

        fetchTitle();
        fetchSavedData();
    }, [user, isAuthModalOpen, navigate]);

    // Handle Group Selection and Filtering
    const handleSelectGroup = async (groupId) => {
        if (activeGroup === groupId) {
            // Deselect and show all
            setActiveGroup(null);
            setFilteredPlants(savedPlants);
            return;
        }
        
        setActiveGroup(groupId);
        // Query CollectionItem for plants in this group
        const { data: items } = await supabase.from('CollectionItem').select('*').eq('group_id', groupId);
        if (items) {
            const groupPlantIds = items.map(i => i.plant_id);
            setFilteredPlants(savedPlants.filter(p => groupPlantIds.includes(p.id)));
        }
    };

    const handleCreateGroup = () => {
        const groupName = prompt("أدخل اسم المجموعة الجديدة:");
        if (groupName) {
            supabase.from('CollectionGroup').insert([{ user_id: user.id, group_name: groupName }]).select().then(({ data }) => {
                if (data) setGroups([...groups, ...data]);
            });
        }
    };

    const handleRemovePlant = async (plantId) => {
        await supabase.from('SavedProduct').delete().eq('user_id', user.id).eq('plant_id', plantId);
        const newPlants = savedPlants.filter(p => p.id !== plantId);
        setSavedPlants(newPlants);
        setFilteredPlants(filteredPlants.filter(p => p.id !== plantId));
    };

    const handleShowSuggestions = async (journey) => {
        // Map the database QuizJourney format to the userAnswers format expected by Suggestions.jsx
        const mappedAnswers = {
            lighting: journey.lighting_selection,
            placement: journey.placement_selection,
            maintenance: journey.maintenance_selection,
            experience: journey.experience_selection,
            objective: journey.objective_selection,
            pets: journey.pets_selection
        };
        const suggestions = await getQuizSuggestions(mappedAnswers);
        navigate('/Suggestions', { state: { suggestions, userAnswers: mappedAnswers } }); 
    };

    return (
        <div className="savePage">
            <div className="navOverlay">
                <Nav hideWave={true} />
            </div>

            <div className="heroBgLayer">
                <img src={heroBg} alt="Background" className="bgImg" />
                <div className="greenOverlay"></div>
                <div className="blurLayer"></div>
            </div>

            <div className="pageContent">
                <div className="saveHeroTitleCont">
                    {titleData ? (
                        <PageTitle 
                            title={titleData.Title} 
                            subtitle={titleData.SubTitle}
                            discription={titleData.Description} 
                        />
                    ) : (
                        <div style={{height: '20vh'}}></div>
                    )}
                </div>

                {!user ? (
                    <div className="saveEmptyState">
                        <h3 className="emptyTitle">عذراً يا صديقي</h3>
                        <p className="emptyDesc">هذه المساحة مخصصة لك لتجمع فيها نباتاتك ورحلاتك المفضلة. انضم إلينا وسجل دخولك لتبدأ في حفظ ما تحب!</p>
                        <MainButton text="تسجيل الدخول" onClick={() => requireAuth(() => {})} className="emptyLoginBtn" />
                    </div>
                ) : (
                    <div className="generalSec">
                        <div className="saveTabSwitcher">
                            <MainButton 
                                className={`saveTabBtn ${activeTab === 'saved' ? 'active' : ''}`}
                                onClick={() => setActiveTab('saved')}
                                text="محفوظاتي"
                            />
                            <MainButton 
                                className={`saveTabBtn ${activeTab === 'journeys' ? 'active' : ''}`}
                                onClick={() => setActiveTab('journeys')}
                                text="رحلاتي"
                            />
                        </div>

                        <div className="saveTabContent">
                            {activeTab === 'saved' && (
                                <div className="savedTabWrapper">
                                    {filteredPlants.length > 0 ? (
                                        <div className="savedPlantsGrid">
                                            {filteredPlants.map(plant => (
                                                <ShopCard 
                                                    key={plant.id} 
                                                    plant={plant} 
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="saveEmptyMessage">لا توجد نباتات محفوظة هنا.</p>
                                    )}

                                    <UserGroups 
                                        groups={groups} 
                                        activeGroup={activeGroup} 
                                        onSelectGroup={handleSelectGroup} 
                                        onCreateGroup={handleCreateGroup} 
                                    />
                                </div>
                            )}

                    {activeTab === 'journeys' && (
                        <div className="journeysTabWrapper">
                            {journeys.length > 0 ? (
                                <div className="journeysGrid">
                                    {journeys.map(journey => (
                                        <JourneyHistoryCard 
                                            key={journey.id} 
                                            journey={journey} 
                                            onShowSuggestions={handleShowSuggestions} 
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="saveEmptyMessage">لا توجد رحلات محفوظة بعد.</p>
                            )}
                        </div>
                    )}
                        </div>
                    </div>
                )}

                    <Footer />

            </div>
        </div>
    );
};

export default Save;
