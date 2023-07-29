import React, { useState,useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import {firestore} from './firebase'
const ImageUpload = () => {
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>('');
  const [showReplaceDialog, setShowReplaceDialog] = useState<boolean>(false);

const storage = firebase.storage()
const cameraInputRef = useRef<HTMLInputElement>(null);
const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const handleFileChange = (e:any) => {
    e.preventDefault();
    let picked;
    if(e.target.files){
      picked = e.target.files[0]
      setImage(picked);
    }
    // const file = e.target.files[0];
    console.log(e.target.files[0])
  };

  const handleUpload = (e:any) => {
e.preventDefault()
const storageRef = storage.ref(`images`);
const uploadTask = storageRef.put(image);

      uploadTask.on(
        'state_changed',
        null,
        (error: any) => {
          console.error('Error uploading image:', error);
        },
        () => {
          // Get the image URL after successful upload
          uploadTask.snapshot.ref.getDownloadURL().then((url: any) => {
            firestore.collection("images")
            .add({
            imgUrl:imageUrl})
            setImageUrl(url);
          });
        }
      );
      };
      const handleCameraCapture = () => {
        console.log(cameraInputRef.current)
        if (cameraInputRef.current) {
          cameraInputRef.current.setAttribute('capture', 'user'); // Use "user" for front camera
          cameraInputRef.current.click();
        }
      };
    
      const handleCameraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
          const picked = e.target.files[0];
          setImage(picked);
          setShowReplaceDialog(false); // Close the dialog after selecting the image
        }
      };
    
      const handleReplaceFromGallery = () => {
        setShowReplaceDialog(false); // Close the dialog
        // Open the file input for gallery image selection
        if (cameraInputRef.current) {
          cameraInputRef.current.click();
        }
      };
      
  const handleStartCamera = async () => {
    try {
      const mediaDevices = navigator.mediaDevices;
      if (!mediaDevices || !mediaDevices.getUserMedia) {
        alert('Camera is not available on this device.');
        return;
      }

      const stream = await mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Error accessing camera.');
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}


      
      {/* Add the replace image functionality */}
      <button onClick={() => setShowReplaceDialog(true)}>Replace Image</button>

      {/* Modal for replace options */}
      {showReplaceDialog && (
        <div>
          <button onClick={handleCameraCapture}>Take Picture</button>
          <button onClick={handleFileChange}>Upload from Gallery</button>
          <button onClick={() => setShowReplaceDialog(false)}>Cancel</button>
        </div>
      )}
       <input
        type="file"
        accept="image/*"
        ref={cameraInputRef}
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleCameraChange}
      />

    </div>
  );
};

export default ImageUpload;