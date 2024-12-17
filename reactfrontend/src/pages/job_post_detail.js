import { useParams } from "react-router-dom";
import Header from "../components/header";
import { useState, useEffect } from "react";
import axiosInstance from "../auth/axios";
import "../components.css";
import { Link } from "react-router-dom";
import Footer from "../components/footer";



const JobPostDetail = () => {

    const [job, setJob] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams();
    const date = new Date();

    useEffect(() => {
        axiosInstance
          .get(`http://127.0.0.1:8000/api/v1/job-details/${id}/`)
          .then((response) => {
            setJob(response.data);
          })
          .catch((error) => {
            setError(error.message);
          });
      }, []);
    
      if (error) {
        return (
          <>
            <Header />
            <p>{error}</p>
          </>
        );
      }
    

  return (
    <>
      <Header />
      <h2 style={{ marginLeft: "20px", marginTop: "20px" }}>{job.job_title} </h2>
      <h3 style={{ marginLeft: "20px", marginTop: "20px", color: "green" }}>Job Details</h3>
      <div
        className="jobs-post"
        style={{ padding: "20px" }}
      >
        <h3>Job Title: {job.job_title}</h3>

        <p style={{ paddingTop: "10px" }}>{job.short_job_description}</p>
        <p style={{ paddingTop: "10px" }}>{job.full_job_description}</p>
        <h3 style={{ paddingTop: "5px" }}>Enumeration: {job.enumeration}</h3>
        <small>posted on {date.toUTCString()}</small>
      </div>
      <Link style={{textDecoration: "None", color: "white" }} to={`/job-application/${id}`}><button style={{ cusor: "pointer", }} className="apply-button">Apply</button></Link>
      < Footer />
    </>
  );
};


export default JobPostDetail;
