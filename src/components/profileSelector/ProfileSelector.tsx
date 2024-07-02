import React from 'react';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setProfile } from '../../redux/slices/profilesSlice';

import './profileSelector.scss';

const ProfileSelector: React.FC = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.profiles.profiles);
  const currentProfile = useSelector((state: RootState) => state.profiles.currentProfile);

  const handleProfileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setProfile(event.target.value));
  };
  
  return (
    <div className='profile-selector'>
      <label htmlFor="profile">Select Profile:</label>
      <select
        id="profile"
        value={currentProfile}
        onChange={handleProfileChange}
      >
        {profiles.map(profile => (
          <option
            key={profile}
            value={profile}
          >
            {profile}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfileSelector;