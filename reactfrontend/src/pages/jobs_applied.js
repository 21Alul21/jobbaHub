import axiosInstance from "../auth/axios";
import { useState, useEffect } from "react";
import Header from "../components/header";


const JobsApplied = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    axiosInstance
      .get("http://localhost:8000/api/v1/user-applications/")
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);



 return(
    <>
   <Header />

   <h1 style={{padding: "20px"}}>Jobs you have applied to</h1>
   {applications && (
     <ul >
        {
            applications.map(app => {
                return(
                    <>
                   
                    <li  style={{textDecoration:"none" ,marginLeft: "20px" }} key={app.id}>
                        <h2>{app.job_title}</h2>
                        <h3>first name</h3>
                        <p>{app.first_name}</p> <br></br>
                        <h3>last name</h3>
                        <p>{app.last_name} </p> <br></br>
                        <h3>uploaded CV</h3>
                       <p>{(app.upload_cv === null) ? "CV not uploaded" : "CV uploaded" } </p> <br></br>
                        <h3>cover letter</h3>
                        <p>{(!app.cover_letter) ? "cover letter not uploaded" : app.cover_letter} </p> <br></br>
                        
                    </li>

                    <hr/>

                    </>
                )
            })
        }

     </ul>
 

   )  
}

    {error && (
      <p>{error}</p>
    )

    }
    </>
   
 )

};

export default JobsApplied;
