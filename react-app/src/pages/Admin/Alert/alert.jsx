import React from 'react';
import {useNavigate} from 'react-router-dom'
import './Alert.css'; // You can create a separate CSS file for styling

const UnauthorizedPage = () => {
  const Navigate=useNavigate();
  function handleButtonClick(){
    Navigate(`/`)
  }
  return (
    <div className='alertbody'>
    <div className="container">
      <div className="main-text">Unauthorized Access</div>
      <div className="sub-text">You are not allowed to view this page</div>
      <div className="sub-text1">If you want to view the page</div>
      <button className="view-button" onClick={handleButtonClick}>
        Login
      </button>
    </div>
    </div>
  );
};

export default UnauthorizedPage;
