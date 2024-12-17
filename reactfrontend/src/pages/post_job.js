import '../components.css'
import Header from "../components/header";
import { useState } from 'react';
import axiosInstance from '../auth/axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({

    job_title: "",
    short_job_description: "",
    full_job_description: "",
  }
    
  );

  const handleFormData = (e) =>{
    const {name, value} = e.target; 

    setFormData({
      ...formData, [name]: value
    });

  };
 



    console.log(formData);

    const handleSubmit = (e) =>{
      e.preventDefault()

      axiosInstance.post('http://127.0.0.1:8000/api/v1/post-job/', formData).then((res) => {
        navigate("/");
      }).catch((error) => {
        alert(error.message);
      })
    }



    return(
        <>
        <Header />

        <div className="login-container">
        <h1 style={{ marginBottom: '20px' }}>Looking to hire someone? <br /> Create a New Job Post Here</h1>
        
        <form onSubmit={handleSubmit}>
          <input onChange={handleFormData} value={formData.name} type="text" name="job_title" placeholder="job title"></input> <br />
          <input onChange={handleFormData} value={formData.short_job_description} type="text" name="short_job_description" placeholder="short job description"></input><br />
          <input onChange={handleFormData} value={formData.full_job_description} type="text" name="full_job_description" placeholder="full job description"></input><br />
          <input onChange={handleFormData} value={formData.enumeration} type="text" name="enumeration" placeholder="enumeration"></input><br />


          <button className="register-button">Submit</button>
        </form>

        </div>

        </>
        
    );
}

export default PostJob;