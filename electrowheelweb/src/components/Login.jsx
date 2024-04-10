import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Notification from './Notification';
import AdminService from '../services/AdminService';



const Login = () => {
  const [formData, setFormData] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [NotificationMessage, setNotificationMessage] = useState('');
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
        setShowNotification(true); 

        console.log(formData);
      const response = await AdminService.adminLogin(formData.email, formData.password);
      const isValid = response.data; // Assuming the response is a boolean
      console.log(isValid);
      if (isValid) {
        console.log('Login successful');
       setNotificationMessage('LogIn Successful. Please Wait')
       document.getElementById('form').reset();  
        setTimeout(() => {
        setShowNotification(false);
      }, 3000);     
       window.location.href = '/vehicles';
      } else {
        setNotificationMessage('Invalid email or password');
         setTimeout(() => {
        setShowNotification(false);
      }, 3000); 
        
      }
    } catch (error) {
      console.error('Error:', error);
       setNotificationMessage('An error occurred. Please try again later.');
        setTimeout(() => {
        setShowNotification(false);
      }, 3000); 
      
    }
  };

  return (
    <div>
      <div className='container'>
     
                <div className='row'>

                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                       <h3 className='text-center'>Log In</h3>
                        <div className='card-body'>

                            <form id='form'>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input placeholder='Email' name = 'email' className='form-control'
                                     onChange= {handleChange} />
                                </div>

                                

                                 <div className='form-group'>
                                    <label>Password</label>
                                    <input placeholder='Password' name = 'password' className='form-control'
                                     onChange= {handleChange} />
                                </div>

                                 <Link to = '/' className='btn btn-success' onClick={handleLogin}>Submit</Link>
                            </form>
                             {showNotification && <Notification message={NotificationMessage} />}
                        </div>

                    </div>
                </div>
            </div>
    </div>
  );
};

export default Login;
