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
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
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
      <section className="section-auth">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            onChange={handleChange}
            type="text"
            name="first_name"
            placeholder="First name"
          />
          <input
            onChange={handleChange}
            type="text"
            name="last_name"
            placeholder="Last name"
          />
          <input
            onChange={handleChange}
            type="text"
            name="expertise"
            placeholder="Expertise"
          />
          <button className="register-button">Register</button>
        </form>
        <div>
          <p>
            Already have an account?
            <Link to="/login">Log in</Link>{" "}
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
