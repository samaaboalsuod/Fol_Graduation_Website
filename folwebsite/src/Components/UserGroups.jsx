import React from 'react';
import './UserGroups.css';

const UserGroups = ({ groups, activeGroup, onSelectGroup, onCreateGroup }) => {
    return (
        <div className="userGroupsSection">
            <h3 className="userGroupsTitle">مجموعاتي</h3>
            
            <div className="userGroupsContainer">
                {groups.map(group => (
                    <div 
                        key={group.id} 
                        className={`userGroupCircle ${activeGroup === group.id ? 'active' : ''}`}
                        onClick={() => onSelectGroup(group.id)}
                    >
                        {group.Photo && (
                            <img src={group.Photo} alt={group.group_name} className="userGroupImg" />
                        )}
                        <div className="userGroupOverlay"></div>
                        <span className="userGroupText">{group.group_name}</span>
                    </div>
                ))}
                
                <div className="userGroupCircle createNew" onClick={onCreateGroup}>
                    <div className="userGroupOverlay"></div>
                    <span className="userGroupText">+ إنشاء مجموعة</span>
                </div>
            </div>
        </div>
    );
};

export default UserGroups;
