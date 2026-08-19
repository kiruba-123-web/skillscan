



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import aiImage from "./assets/image1.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState(""); // <-- New State
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle file upload
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }
    setFile(selectedFile);
  };

  // Analyze Resume
  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload your resume first!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      // Append the Job Description to the payload
      formData.append("jobDescription", jobDescription); 

const response = await axios.post(
  "https://skillscan-l7w8.onrender.com/api/resume/upload",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
);    console.log(response.data);

      navigate("/result", {
        state: {
          _id: response.data._id, 
          score: response.data.atsScore,
          skillsFound: response.data.skillsFound,
          skillsMissing: response.data.skillsMissing,
          strengths: response.data.strengths, // <-- ADD THIS LINE
          suggestions: response.data.suggestions,
          aiFeedback: response.data.aiFeedback,
          fileName: file.name
        }
      });

    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">SkillScan AI</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/result">Result</Link>
          <Link to="/history">History</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="container">
        {/* LEFT IMAGE */}
        <div className="left">
          <img src={aiImage} alt="AI" className="ai-img" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="right">
          <h1>Optimize Your Career with AI</h1>
          <p>Instantly analyze your resume against any job description</p>

          {/* Job Description Textarea */}
          <textarea 
            className="jd-input"
            placeholder="Paste the Job Description here (optional but recommended for accurate scoring)..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="5"
            style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px" }}
          ></textarea>

          {/* Upload Box */}
          <div className="upload-box">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFile}
            />
            <p className="file-name">
              {file ? file.name : "Upload your resume (PDF)"}
            </p>
          </div>

          {/* Analyze Button */}
          <button
            className="btn"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;


