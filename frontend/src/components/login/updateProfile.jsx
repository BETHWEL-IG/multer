import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

export const ProfilePictureForm=()=> {
  const [profilePicture, setProfilePicture] = useState(null);
  const {user}=useAuthContext()
  console.log(user.email)

  if(!user){
    return <Navigate to={'login'} />
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `/api/users/${user.id}/`;
    const method = 'PATCH';
    const body = new FormData();
    if (profilePicture) {
      body.append('profile_picture', profilePicture);
    }
    try {
      const response = await fetch(url, { method, body });
      if (response.ok) {
        console.log('Profile picture updated successfully');
      } else {
        console.error('Profile picture update failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Profile picture:
        <input type="file" onChange={(event) => setProfilePicture(event.target.files[0])} />
      </label>
      <button type="submit">Update profile picture</button>
    </form>
  );
}
