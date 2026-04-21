import React, { useState, useEffect } from 'react';
import './MapSection.css';
import { supabase } from '../Supabase.jsx';

const MapSection = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const { data, error } = await supabase
                .from('Location')
                .select('*')
                .order('id', { ascending: true });
            
            if (data) setLocations(data);
        };

        fetchLocations();
    }, []);

    // construct map URL using the first location or a center point
    // t=k is satellite, which gives a better "relief" / detailed view
    const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55231.87445771344!2d31.2569!3d29.9601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583840fd0e7641%3A0x1993414841d13!2zTWFhZGksIENhaXJvIEdvdmVybm9yYXRlLCBFZ3lwdA!5e0!3m2!1sen!2seg!4v1713735000000!5m2!1sen!2seg&t=k`;

    return (
        <div className="mapContainer">
            <iframe 
                title="Fol Locations Map"
                src={mapSrc}
                width="100%" 
                height="500" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Dark matching overlay that dissolves on hover */}
            <div className="mapOverlay"></div>
            
            <div className="locationGlassCard">
                {locations.map((loc) => (
                    <div key={loc.id} className="locationBlock">
                        <p className="addressText">{loc.addressar}</p>
                        <p className="cityText">{loc.cityar}</p>
                    </div>
                ))}
                <div className="hoursBlock">
                    {locations.length > 0 && <p className="hoursText">{locations[0].hoursar}</p>}
                </div>
            </div>
        </div>
    );
};

export default MapSection;
