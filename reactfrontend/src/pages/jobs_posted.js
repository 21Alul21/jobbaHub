import Header from "../components/header";
import { useEffect } from "react";
import axiosInstance from "../auth/axios";
import { useState } from "react";

const JobsPosted = () => {

    const [jobPosts, setJobPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(
        () =>{
            axiosInstance.get("http://localhost:8000/api/v1/user-job-posts/"
            ).then((res) => {setJobPosts(res.data)
            console.log(jobPosts)})
            .catch((e) => {
                if (e){
                    setError(e.message);
                }
            })

        },[]
    )

    return(
        <>
        <Header />
        {jobPosts && (
            <div >
                <h1 style={{marginBottom: "20px", marginLeft: "20px" }}>Jobs you posted </h1>
            <ul >
            {jobPosts.map((job) => {

                        return(
                            <>
                            
                            <li style={{ padding: "20px"}} key={job.id}>
                            <h3>job title </h3>
                            <p>{job.job_title}</p> <br></br>
                            <h3>job description</h3>
                            <p>{job.short_job_description}</p>
                            <p>{job.full_job_description}</p>
                                        
                            </li>
                            <hr />
                            </>

                        )
                        
                        
                    }) }
               
            </ul>

        </div>
        )

        }
<p>{error}</p>

        
        </>
        
    )
}

export default JobsPosted;