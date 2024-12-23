import { FaTrash } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { useState, useEffect } from "react";
import axiosInstance from "../auth/axios";
import "../components.css";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const JobPostDetail = () => {
  const [job, setJob] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const date = new Date();

  function handleDeletePost() {
    axiosInstance
      .delete(`http://127.0.0.1:8000/api/v1/delete-post/${id}/`)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.message);
      });
  }

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
      <section className="section-job-post_details">
        <h4>Job Details</h4>
        <main>
          <div className="jobs-post">
            <h2>
              <strong>Job Title: </strong>
              {job.job_title}
            </h2>

            <p>
              <strong>Summary:</strong> {job.short_job_description}
            </p>
            <p>
              <strong>Description:</strong>&nbsp;
              {job.full_job_description}
            </p>
            <h3>
              <strong>Enumeration:</strong>&nbsp;
              {job.enumeration}
            </h3>
            <small>
              <strong>Posted on:</strong> {date.toUTCString()}
            </small>
          </div>

          <div className="btn-cont">
            <Link to={`/job-application/${id}`}>
              <button>Apply</button>
            </Link>
            <button className="delete" onClick={handleDeletePost}>
              <FaTrash />
            </button>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default JobPostDetail;
