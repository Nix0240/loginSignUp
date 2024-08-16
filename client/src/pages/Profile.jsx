import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import { updateUserProfile } from '../redux/user/userSlice';
import InputField from '../components/InputField';
import api from '../services/api';
import './Profile.css';

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: ''
  });

  console.log("User OUT",user)

  useEffect(() => {
    if (user) {
      console.log('User data in Profile component:', user);
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobile: user.mobile || '',
        email: user.email || ''
      });
    }
  }, [user]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/profile', formData);
      dispatch(updateUserProfile(response.data));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <InputField
          label="Mobile"
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          readOnly={!isEditing}
        />
        {isEditing ? (
          <>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </form>
    </div>
  );
};

export default Profile;