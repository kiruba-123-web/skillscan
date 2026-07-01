import { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

function History() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("https://skillscan-7.onrender.com/api/resume/all");
      setResumes(res.data);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  return (
    <div className="history-page">

      <h2>📜 Resume History</h2>

      {resumes.length === 0 ? (
        <p>No resumes found</p>
      ) : (
        <div className="history-list">
          {resumes.map((item) => (
            <div className="history-card" key={item._id}>
              
              <h3>{item.name}</h3>
              <p><b>Email:</b> {item.email}</p>
              <p><b>File:</b> {item.fileName}</p>
              <p><b>ATS Score:</b> {item.atsScore}</p>

              <div className="actions">
                <a
                  href={`https://skillscan-7.onrender.com/api/resume/download/${item._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Download PDF</button>
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default History;