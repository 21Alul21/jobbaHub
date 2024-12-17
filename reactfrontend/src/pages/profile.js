import "../pages.css";
import Header from "../components/header";
import profilePic from "../images/profile-pic.png";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {


  const [defaultPic, setPic] = useState(profilePic);
  const [uploadedprofilePic, setuploadedProfilePic] = useState();
  const [uploadedprofilePicUrl, setuploadedProfilePicUrl] = useState();

  const ref = useRef();

  const chosePicture = () => {
    ref.current.click();
  };

  const handleProfilePic = (e) => {
    const uploadedprofilePic = e.target.files[0];
    if (uploadedprofilePic) {
      const uploadedprofilePicUrl = URL.createObjectURL(uploadedprofilePic);
      setPic(uploadedprofilePicUrl);
      alert(defaultPic);

     
    }
  };

  return (
    <>
      <Header />

      <div className="profile-container">
        <h1>Edit your profile</h1>

        <div
          style={{ borderRadius: "100%", overflow: "hidden" }}
          onClick={chosePicture}
          className="profile-pic-container"
        >
          <img
            alt="profile picture"
            src={defaultPic}
            style={{ borderRadius: "100%" }}
          />
        </div>
        <form action="" method="POST">
          <input
            onChange={handleProfilePic}
            style={{ display: "none" }}
            ref={ref}
            className="profile-pic-input"
            type="file"
            id="pic"
            name="profile_pic"
          />
          <input type="text" name="email" placeholder="email"></input> <br />
          <input type="text" name="first_name" placeholder="first name"></input>
          <br />
          <input type="text" name="last_name" placeholder="last name"></input>
          <br />
          <input type="text" name="expertise" placeholder="expertise"></input>
          <br />
          <button className="register-button">Save changes</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
