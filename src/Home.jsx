



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
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
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(response.data);

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


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Initialize cooldown from localStorage (if exists)
//   const [cooldownTime, setCooldownTime] = useState(() => {
//     const savedTime = localStorage.getItem("cooldownExpiry");
//     if (savedTime) {
//       const remaining = Math.ceil((parseInt(savedTime) - Date.now()) / 1000);
//       return remaining > 0 ? remaining : 0;
//     }
//     return 0;
//   });

//   // Handle the countdown logic
//   useEffect(() => {
//     let timer;
//     if (cooldownTime > 0) {
//       timer = setInterval(() => {
//         setCooldownTime((prev) => {
//           if (prev <= 1) {
//             localStorage.removeItem("cooldownExpiry");
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [cooldownTime]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleAnalyze = async (e) => {
//     e.preventDefault();

//     if (!file || cooldownTime > 0) return;

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       // Ensure your backend URL matches your server.js port
//       const response = await axios.post("http://localhost:5000/api/resume/upload", formData);
      
//       // Success! Clear any existing cooldowns
//       localStorage.removeItem("cooldownExpiry");
//       navigate("/result", { state: response.data });

//     } catch (error) {
//       console.error("Upload failed:", error);

//       // Trigger 60-second cooldown on Rate Limit (429) or Server Error (500)
//       if (error.response && (error.response.status === 429 || error.response.status === 500)) {
//         const expiry = Date.now() + 60000;
//         localStorage.setItem("cooldownExpiry", expiry.toString());
//         setCooldownTime(60);
//         alert("Server is busy. Cooldown activated for 60 seconds.");
//       } else {
//         alert("Something went wrong. Please check your connection.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="upload-box">
//         <h1>SkillScan AI</h1>
//         <p>Optimize your resume with Gemini AI</p>
        
//         <input 
//           type="file" 
//           accept=".pdf" 
//           onChange={handleFileChange} 
//           id="file-upload"
//           hidden
//         />
        
//         <label htmlFor="file-upload" className="file-label">
//           {file ? file.name : "Click to upload Resume (PDF)"}
//         </label>

//         <button 
//           onClick={handleAnalyze} 
//           disabled={isLoading || cooldownTime > 0 || !file}
//           className={`analyze-btn ${cooldownTime > 0 ? "disabled" : ""}`}
//         >
//           {isLoading ? (
//             "Analyzing..."
//           ) : cooldownTime > 0 ? (
//             `Cooldown: ${cooldownTime}s`
//           ) : (
//             "Analyze Resume"
//           )}
//         </button>

//         {cooldownTime > 0 && (
//           <p className="cooldown-note">
//             Rate limit reached. Please wait for the timer to finish.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;