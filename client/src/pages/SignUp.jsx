import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/user/userSlice";
import InputField from "../components/InputField";
import api from '../services/api';
import "./Signup.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const validate = () => {
    const errors = {};
    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!mobile) errors.mobile = "Mobile is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const response = await api.post('/users/register', { firstName, lastName, mobile, email, password });
        if (response.data.token) {
          dispatch(login({ user: response.data.user, token: response.data.token }));
          localStorage.setItem('token', response.data.token);
          navigate('/profile');
        }
      } catch (error) {
        setErrors({ apiError: error.response?.data?.message || 'Sign up failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <InputField
          label="Mobile"
          type="tel"
          name="mobile"
          value={mobile}
          onChange={handleChange}
          error={errors.mobile}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          error={errors.password}
        />
        {errors.apiError && <div className="error-message">{errors.apiError}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;