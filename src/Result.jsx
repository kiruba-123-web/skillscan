
import { useLocation, useNavigate,Link } from "react-router-dom";
import "./Result.css";

function Result() {

  const location = useLocation();
  const navigate = useNavigate();

  console.log("STATE:", location.state); // ✅ DEBUG

  if (!location.state) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>No resume analyzed yet</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const id = location.state?._id;   // ✅ correct
  const score = location.state?.score || 0;
  const skillsFound = location.state?.skillsFound || [];
  const strengths = location.state?.strengths || [];
  const suggestions = location.state?.suggestions || [];
  const aiFeedback = location.state?.aiFeedback || "No AI feedback available";
  const fileName = location.state?.fileName || "resume.pdf";

  return (
    <div className="result-page">

      <nav className="navbar">
  <div className="logo">SkillScan AI</div>

  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/history">History</Link>
  </div>
</nav>
      <div className="result-container">

        <div className="score-box">
          <h2>ATS Score</h2>
          <div className="circle">
            <h1>{score}</h1>
            <p>Overall Score</p>
          </div>
        </div>

        <div className="skills-box">
          <h3>Matched Skills</h3>
          <div className="skills">
            {skillsFound.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="card success">
          <h3>Strengths</h3>
          <ul>
            {strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="card warning">
          <h3>Resume Suggestions</h3>
          <ul>
            {suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="insight">
          💡 <b>AI Insight:</b> {aiFeedback}
        </div>

        <div className="actions">

          {/* ✅ FIXED BUTTON */}
          {id && (
            <a
              href={`https://skillscan-l7w8.onrender.com/api/resume/download/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="download">
                Download PDF
              </button>
            </a>
          )}

          <button
            className="rescan"
            onClick={() => navigate("/")}
          >
            Re-Scan Resume
          </button>

        </div>

        <p className="file">
          Analyzed File: {fileName}
        </p>

      </div>
    </div>
  );
}

export default Result;



