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

  const handleClear = () => {
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
        console.log(jobs);
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
      <div
        style={{
          display: "flex",
          color: "white",
          width: "100%",
          border: "solid",
          backgroundColor: "black",
          height: "50px",
        }}
      >
        <input
          value={searchval}
          onChange={handleJobSearch}
          style={{ height: "100%", width: "80%" }}
          placeholder="search jobs"
          type="text"
        />
        <div
          onClick={handleClear}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "solid",
            width: "20%",
            height: "100%",
          }}
        >
          clear
        </div>
      </div>

      <h1 style={{ padding: "20px" }}>Available jobs for you</h1>

      
       

      <ul>
        {jobs.filter((job) => {
          return searchval.toLowerCase() === "" ? job : 
          job.job_title.toLowerCase().includes(searchval.toLowerCase());
        }).map((job) => (
          <li key={job.id}>
            <div
              className="jobs-post"
              style={{ padding: "20px", cursor: "pointer" }}
              onClick={() => {jobDetail(job.id)}}
            >
              <h3>Job Title: {job.job_title}</h3>
              <p style={{ paddingTop: "10px" }}>{job.short_job_description}</p>
              {/*<h3 style={{ paddingTop: "5px" }}>Enumeration: {job.enumeration}</h3>*/}
              <small>posted on {date.toUTCString()}</small>
            </div>
            <hr />
          </li>
        ))}

        <p style={{ marginTop: "100px", marginLeft: "20px" }}>
          You are all caugt up....
        </p>
      </ul>

    </>
  );
};

export default JobPosts;
