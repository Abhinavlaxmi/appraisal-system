import React, { useState, useContext } from 'react';
// import logo from './../assets/logo.svg';
import CustomButton from '../components/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
// import axios from '../../../axiosinstance';
// import { APIs } from '../../services/APIs';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../contexts/ThemeContext';
import { themeHandler } from '../services/redux/slices/themeSlice';
import authHandler, { loginUser }  from '../services/redux/slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { colors } = useContext(ThemeContext);

  const handleLogin = async () => {
    if (!email && !password) {
      setEmailErrorMessage("Email is required.");
      setPasswordErrorMessage("Password is required.");
      return;
    }

    if (!email) {
      setEmailErrorMessage("Email is required.");
      return;
    }

    if (!password) {
      setPasswordErrorMessage("Password is required.");
      return;
    }

    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setLoading(true);
    console.log("Email :", email);
    console.log("Password :", password);

    try {
      const response = await dispatch(loginUser({ email: email, password })).unwrap();
      console.log(response, "user login response");
      // dispatch(themeHandler(response.theme));
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      // console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="w-1/2 flex flex-col justify-center px-8"
        style={{ backgroundColor: colors[theme].cardBackground }}
      >
        <h1 style={{ color: colors[theme].color }} className="text-4xl font-bold">
          Login
        </h1>
        <p style={{ color: colors[theme].primary }} className="text-2xl mt-4">
          Please Fill the details below to continue
        </p>
        <div className="mt-8 w-full">
          <label className="block font-medium text-xl mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailErrorMessage('');
            }}
            placeholder="Enter the Email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: colors[theme].borderColor,
              // Tailwind's focus:ring is not applicable here, use CSS or other methods if needed
            }}
          />
          {emailErrorMessage && (
            <p style={{ color: colors[theme].color }} className="text-sm mt-2">
              {emailErrorMessage}
            </p>
          )}
        </div>

        <div className="mt-4 w-full">
          <label className="block font-medium text-xl mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordErrorMessage('');
            }}
            placeholder="Enter the Password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: colors[theme].borderColor,
            }}
          />
          {passwordErrorMessage && (
            <p style={{ color: colors[theme].color }} className="text-sm mt-2">
              {passwordErrorMessage}
            </p>
          )}
        </div>

        <CustomButton
          label="Login"
          onClick={handleLogin}
          className="mt-8 text-xl focus:outline-none"
          loading={loading}
          disabled={loading}
        />

        <div
          style={{ color: colors[theme].color }}
          className="flex justify-end mt-2 font-semibold cursor-pointer hover:underline active:opacity-85"
          onClick={() => navigate('/resetpassword')}
        >
          Forgot Password?
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center bg-[#d91029]">
        {/* <img src={logo} alt="Jaina Group" className="w-3/4" /> */}
      </div>
    </div>
  );
};

export default LoginPage;