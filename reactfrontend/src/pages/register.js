import "../pages.css";
import Header from "../components/header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const [errorMessage, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",     
    expertise: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    
    setFormData({
      ...formData, [name]: value
  });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post("http://127.0.0.1:8000/api/v1/register/", formData)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response);
        } else {
          setError("something bad occured");
        }
      });

    alert(errorMessage);
    console.log(errorMessage);
  };

  return (
    <>
      <Header />

      <div className="register-container">
        <h1 style={{ marginBottom: "20px" }}>Register</h1>
        <form onSubmit={handleSubmit}>
        

          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
            placeholder="email"
          ></input>
          <br />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
          ></input>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="first_name"
            placeholder="first name"
          ></input>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="last_name"
            placeholder="last name"
          ></input>
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="expertise"
            placeholder="expertise"
          ></input>
          <br />
          <button className="register-button">Register</button>
        </form>
        
        <p>---or---</p>
        <h3><Link to="/login" >Log in</Link> </h3>
      </div>
    </>
  );
};

export default Register;
