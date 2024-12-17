import React from "react";
import "../pages.css";
import { useState, useEffect } from "react";
import Header from "../components/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState("");
  let [searchval, setSearchVal] = useState("");

  const date = new Date();
  const navigate = useNavigate();

  const handleJobSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSearchVal("");
  };

  const jobDetail = (id) => {
    navigate(`job-details/${id}/`);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/job-listings/")
      .then((response) => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setErrors(error.message);
      });
  }, []);

  if (errors) {
    return (
      <>
        <Header />
        <p>{errors}</p>
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="section-job-posts">
        <div className="search-container">
          <input
            value={searchval}
            onChange={handleJobSearch}
            placeholder="search jobs"
            type="text"
          />
          <button typeof="button" onClick={handleClear}>
            clear
          </button>
        </div>
        <main>
          <h1>Available jobs for you</h1>

          <ul>
            {jobs
              .filter((job) => {
                return searchval.toLowerCase() === ""
                  ? job
                  : job.job_title
                      .toLowerCase()
                      .includes(searchval.toLowerCase());
              })
              .map((job) => (
                <li
                  key={job.id}
                  className="jobs-post"
                  onClick={() => {
                    jobDetail(job.id);
                  }}
                >
                  <h3>Job Title: {job.job_title}</h3>
                  <p>{job.short_job_description}</p>
                  {/*<h3 style={{ paddingTop: "5px" }}>Enumeration: {job.enumeration}</h3>*/}
                  <small>posted on {date.toUTCString()}</small>
                </li>
              ))}
          </ul>
          <p style={{ marginTop: "100px", marginLeft: "20px" }}>
            You are all caugt up....
          </p>
        </main>
      </section>
    </>
  );
};

export default JobPosts;
