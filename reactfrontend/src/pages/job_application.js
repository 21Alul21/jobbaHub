import "../pages.css";
import Header from "../components/header";
import { useState } from "react";
import axiosInstance from "../auth/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const JobApplication = () => {
  const navigate = useNavigate();
  const { job_id } = useParams();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    cover_letter: "",
    upload_cv: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "upload_cv" ? files[0] : value, // Handle file separately
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("cover_letter", formData.cover_letter);
    formDataToSend.append("upload_cv", formData.upload_cv); // Append file here

    axiosInstance
      .post(
        `http://127.0.0.1:8000/api/v1/job-applications/${job_id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("Error submitting form: " + error);
      });
  };

  return (
    <>
      <Header />
      <div className="job-application-container">
        <h1 style={{ marginBottom: "20px" }}>
          Fill the Application Form for the selected job{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
          />
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="last_name"
            placeholder="Last name"
            value={formData.last_name}
          />
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="cover_letter"
            placeholder="Cover letter"
            value={formData.cover_letter}
          />
          <br />
          <label
            className="select-cv"
            htmlFor="select-cv"
            style={{
              cursor: "pointer",
              paddingBottom: "10px",
              paddingTop: "20px",
            }}
          >
            Select CV
          </label>
          <input
            id="select-cv"
            type="file"
            accept="application/pdf"
            name="upload_cv"
            onChange={handleChange} // Attach handleChange here
          />
          <br />
          <button className="login-button" type="submit">
            Apply
          </button>
        </form>
      </div>
    </>
  );
};

export default JobApplication;
