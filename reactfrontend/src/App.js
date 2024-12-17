import Login from "./pages/login";
import Register from "./pages/register";
import JobPosts from "./pages/job_posts";
import JobPostDetail from "./pages/job_post_detail";
import JobApplication from "./pages/job_application";
import PostJob from "./pages/post_job";
import Profile from "./pages/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protected from "./auth/protected";
import Logout from "./components/Logout";
import JobsPosted from "./pages/jobs_posted";
import JobsApplied from "./pages/jobs_applied";
import RefreshAccess from "./utils/tokenRefresh";

function App() {
  return (
    <Router>
      <RefreshAccess />

      <Routes>
        {/* protected routes */}

        <Route element={<Protected />}>
          <Route path="/jobs-applied/" element={<JobsApplied />} />
          <Route path="/jobs-posted/" element={<JobsPosted />} />
          <Route
            path="/job-application/:job_id/"
            element={<JobApplication />}
          />
          <Route path="/post-job/" element={<PostJob />} />
          <Route path="/profile/" element={<Profile />} />
        </Route>

        {/* public routes */}
        <Route path="/logout/" element={<Logout />} />
        <Route path="/" element={<JobPosts />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/job-details/:id/" element={<JobPostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
