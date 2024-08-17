import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/userSlice';
import InputField from '../components/InputField';
import './Profile.css';

const Profile = () => {
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobile: user.mobile || '',
        email: user.email || ''
      });
    }
  }, [user]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <form>
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          readOnly
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          readOnly
        />
        <InputField
          label="Mobile"
          type="tel"
          name="mobile"
          value={formData.mobile}
          readOnly
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          readOnly
        />
      </form>
    </div>
  );
};

export default Profile;
