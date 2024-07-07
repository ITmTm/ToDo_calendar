import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

import './profileSelector.scss';

interface ProfileSelectorProps {
  profiles: string[];
  currentProfile: string;
  switchProfile: (profile: string) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ profiles, currentProfile, switchProfile }) => {
  const [selectedProfile, setSelectedProfile] = useState(currentProfile);

  const handleProfileChange = (event: SelectChangeEvent) => {
    const newProfile = event.target.value as string;
    setSelectedProfile(newProfile);
    switchProfile(newProfile);
  };

  return (
    <FormControl variant='outlined' fullWidth>
      <InputLabel id='profile-select-label'>Profile</InputLabel>
      <Select
        labelId='profile-select-label'
        id='profile-select'
        value={selectedProfile}
        onChange={handleProfileChange}
        label='Profile'
      >
        {profiles.map((profile) => (
          <MenuItem key={profile} value={profile}>
            {profile}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProfileSelector;