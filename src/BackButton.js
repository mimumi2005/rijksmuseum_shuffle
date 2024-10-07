
import {useNavigate } from 'react-router-dom';
function BackButton() {
    const navigate = useNavigate();
  
    return (
      <button className="custom-button" onClick={() => navigate("/")}>
        Back to gallery
      </button>
    );
  }
  export default BackButton;