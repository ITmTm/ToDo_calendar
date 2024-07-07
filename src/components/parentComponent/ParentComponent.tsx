import React, { useState } from 'react';
import ProfileSelector from '../profileSelector/ProfileSelector';
import Calendar from '../calendar/Calendar';

import './parentComponent.scss';

const profiles = ['Profile_1', 'Profile_2', 'Profile_3'];

const ParentComponent: React.FC = () => {
  const [currentProfile, setCurrentProfile] = useState(profiles[0]);

  const switchProfile = (profile: string) => {
    setCurrentProfile(profile);
      // Можно добавлять дополнительную логику для профилей
  };

  return (
    <div className='parent-component'>
      <ProfileSelector
        profiles={profiles}
        currentProfile={currentProfile}
        switchProfile={switchProfile}
      />
      <Calendar />
    </div>
  );
};

export default ParentComponent;