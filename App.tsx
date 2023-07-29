import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from './ImageUpload';
const App: React.FC = () => {
  const handleButtonClick = () => {
    toast('Button pressed!', {
      type: 'info',
      position: 'top-center', // Set the notification position to top-center
    });
  };

  return (
    <div className="App">
      {/* notification */}
      {/* <h1>Press the big red button!</h1>
      <button onClick={handleButtonClick}>Press me</button>
      <ToastContainer /> */}

      {/*  imageupload*/}
      <ImageUpload/>
    </div>
  );
};

export default App;
