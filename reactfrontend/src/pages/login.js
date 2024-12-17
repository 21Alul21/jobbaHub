import '../pages.css'
import Header from '../components/header';
import { useEffect, useState } from 'react';
import axiosInstance from '../auth/axios';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
      email: "",
      password: ""
    }
  );

  const handleForm = (e) =>{
    const {name, value} = e.target;
    setFormData({
      ...formData, [name]: value
  });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    axiosInstance.post(
      "http://127.0.0.1:8000/api/v1/login/", formData
    ).then((res) =>{
      localStorage.setItem("access", res.data.access)
    
      navigate("/")
    }).catch((error) =>{
      // alert(error.message);
    })
    
  }
    
  
  return (
    <>
        < Header />
      <div className="login-container">
        <h1 style={{ marginBottom: '20px' }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleForm} type="text" name="email" value={formData.email} placeholder="email"></input> <br />
          <input onChange={handleForm} value={formData.password}
            type="text"
            name="password"
            placeholder="password"
          ></input>
          <br />
          <button className='login-button'>Login</button>
        </form>
        <h3>Forgot password?</h3>
        <p>---or---</p>
        <h3><Link to={"/register"}>Create account</Link></h3>
      </div>
    </>
  );
};

export default Login;
