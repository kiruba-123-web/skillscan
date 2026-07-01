
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
// const { GoogleGenAI } = require("@google/genai");
// const Resume = require("../models/resume");

// // Initialize Gemini
// // const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);


// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("resume"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//   const filePath = req.file.path;

//   try {
//     // PDF Text Extraction
//     const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
//     const loadingTask = pdfjsLib.getDocument({ data: dataBuffer, useSystemFonts: true });
//     const pdf = await loadingTask.promise;
    
//     let resumeText = "";
//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       resumeText += content.items.map(item => item.str).join(" ") + " ";
//     }

//     // AI Analysis
//     // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const prompt = `Analyze this resume text: "${resumeText}". Return ONLY a JSON object with keys: name, email, atsScore, skillsFound, skillsMissing, strengths, suggestions, aiFeedback.`;

//     // const result = await model.generateContent(prompt);
//     // const response = await result.response;
//     // const aiData = JSON.parse(response.text().replace(/```json|```/g, ""));



// // const response = await genAI.models.generateContent({
// //   model: "gemini-2.0-flash",
// //   contents: prompt,
// // });

// // const text = response.text;
// // const cleaned = text.replace(/```json|```/g, "").trim();

// // let aiData = {};

// // try {
// //   aiData = JSON.parse(cleaned);
// // } catch (e) {
// //   console.log("Invalid JSON:", cleaned);
// //   throw new Error("AI returned invalid JSON");
// // }


// // const text = response.text;

// // // Clean JSON (important ⚠️)
// // const cleaned = text.replace(/```json|```/g, "").trim();

// // const aiData = JSON.parse(cleaned);

// //     // Save to Database
// //     const newResume = new Resume({
// //       name: aiData.name || "Unknown",
// //       email: aiData.email || "Unknown",
// //       fileName: req.file.originalname,
// //       atsScore: aiData.atsScore || 0,
// //       skillsFound: aiData.skillsFound || [],
// //       skillsMissing: aiData.skillsMissing || [],
// //       suggestions: aiData.suggestions || [],
// //       aiFeedback: aiData.aiFeedback || ""
// //     });
// //     await newResume.save();

// //     fs.unlinkSync(filePath); 
// //     res.json(aiData);

// //   } catch (err) {
// //     console.error("Analysis failed:", err);
// //     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
// //     res.status(500).json({ message: "Analysis failed", error: err.message });
// //   }
// // });

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
// const { GoogleGenAI } = require("@google/genai");
// // const Resume = require("../models/resume");

// // // ✅ Gemini Init (ONLY ONCE)
// // const genAI = new GoogleGenAI({
// //   apiKey: process.env.GEMINI_API_KEY,
// // });

// // const upload = multer({ dest: "uploads/" });

// // // 🚀 Upload Route
// // router.post("/upload", upload.single("resume"), async (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ message: "No file uploaded" });
// //   }

// //   const filePath = req.file.path;

// //   try {
// //     // =========================
// //     // 📄 Extract PDF Text
// //     // =========================
// //     const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
// //     const pdf = await pdfjsLib.getDocument({
// //       data: dataBuffer,
// //       useSystemFonts: true,
// //     }).promise;

// //     let resumeText = "";

// //     for (let i = 1; i <= pdf.numPages; i++) {
// //       const page = await pdf.getPage(i);
// //       const content = await page.getTextContent();
// //       resumeText += content.items.map(item => item.str).join(" ") + " ";
// //     }

// //     // =========================
// //     // 🤖 AI Prompt
// //     // =========================
// //     const prompt = `
// //     Analyze this resume and return ONLY valid JSON:

// //     {
// //       "name": "",
// //       "email": "",
// //       "atsScore": 0,
// //       "skillsFound": [],
// //       "skillsMissing": [],
// //       "strengths": [],
// //       "suggestions": [],
// //       "aiFeedback": ""
// //     }

// //     Resume:
// //     ${resumeText}
// //     `;

// //     // =========================
// //     // ⚡ Gemini API Call
// //     // =========================
// //     const response = await genAI.models.generateContent({
// //       model: "gemini-3.0-flash",
// //       contents: prompt,
// //     });

// //     const text = response.text;

// //     // =========================
// //     // 🧹 Clean JSON
// //     // =========================
// //     const cleaned = text.replace(/```json|```/g, "").trim();

// //     let aiData = {};

// //     try {
// //       aiData = JSON.parse(cleaned);
// //     } catch (err) {
// //       console.log("❌ Invalid JSON from AI:", cleaned);
// //       throw new Error("AI returned invalid JSON");
// //     }

// //     // =========================
// //     // 💾 Save to MongoDB
// //     // =========================
// //     const newResume = new Resume({
// //       name: aiData.name || "Unknown",
// //       email: aiData.email || "Unknown",
// //       fileName: req.file.originalname,
// //       atsScore: aiData.atsScore || 0,
// //       skillsFound: aiData.skillsFound || [],
// //       skillsMissing: aiData.skillsMissing || [],
// //       suggestions: aiData.suggestions || [],
// //       aiFeedback: aiData.aiFeedback || "",
// //     });

// //     await newResume.save();

// //     // =========================
// //     // 🧹 Delete File
// //     // =========================
// //     fs.unlinkSync(filePath);

// //     // =========================
// //     // ✅ Response
// //     // =========================
// //     res.json(aiData);

// //   } catch (err) {
// //     console.error("🔥 Analysis failed:", err);

// //     if (fs.existsSync(filePath)) {
// //       fs.unlinkSync(filePath);
// //     }

// //     res.status(500).json({
// //       message: "Analysis failed",
// //       error: err.message,
// //     });
// //   }
// // });

// // module.exports = router;



// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const fs = require("fs");
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// const Resume = require("../models/resume");

// // ✅ OpenAI Init
// const OpenAI = require("openai").default;

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const upload = multer({ dest: "uploads/" });

// // ==========================
// // 🧠 ATS LOGIC (Fallback)
// // ==========================
// function calculateATS(text) {
//   let score = 0;

//   const skills = ["react", "node", "mongodb", "javascript", "html", "css"];

//   skills.forEach(skill => {
//     if (text.toLowerCase().includes(skill)) {
//       score += 15;
//     }
//   });

//   return Math.min(score, 100);
// }

// function extractSkills(text) {
//   const skills = ["react", "node", "mongodb", "javascript", "html", "css"];

//   return skills.filter(skill =>
//     text.toLowerCase().includes(skill)
//   );
// }

// // ==========================
// // 🚀 Upload Route
// // ==========================
// router.post("/upload", upload.single("resume"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   const filePath = req.file.path;

//   try {
//     // ==========================
//     // 📄 Extract PDF Text
//     // ==========================
//     const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
//     const pdf = await pdfjsLib.getDocument({
//       data: dataBuffer,
//       useSystemFonts: true,
//     }).promise;

//     let resumeText = "";

//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const content = await page.getTextContent();
//       resumeText += content.items.map(item => item.str).join(" ") + " ";
//     }

//     // ==========================
//     // 🤖 AI + Fallback
//     // ==========================
//  // ==========================
// // 🤖 AI + Fallback (Optimized)
// // ==========================
// let aiData = {};
// let source = "AI";

// // ❌ REMOVE THIS (security issue)
// // console.log("KEY:", process.env.OPENAI_API_KEY);

// try {
//   // ✅ 1. Reduce input size (BIG cost save)
//   const shortResume = resumeText.slice(0, 1200);

//   // ✅ 2. Simple cache (avoid repeated API calls)
//   const cacheKey = shortResume.slice(0, 100);
//   global.resumeCache = global.resumeCache || {};

//   if (global.resumeCache[cacheKey]) {
//     return res.json({
//       ...global.resumeCache[cacheKey],
//       source: "cache",
//     });
//   }

//   // ✅ 3. Optimized API call
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "user",
//         content: `Return ONLY JSON:
// {
// "name": "",
// "email": "",
// "atsScore": 0,
// "skillsFound": [],
// "skillsMissing": [],
// "suggestions": [],
// "aiFeedback": ""
// }

// Resume:
// ${shortResume}`,
//       },
//     ],
//     max_tokens: 200, // ✅ LIMIT OUTPUT (VERY IMPORTANT)
//   });

//   // ✅ 4. Track usage (optional but useful)
//   console.log("Tokens used:", completion.usage.total_tokens);

//   const text = completion.choices[0].message.content;
//   const cleaned = text.replace(/```json|```/g, "").trim();

//   aiData = JSON.parse(cleaned);

//   // ✅ 5. Save to cache
//   global.resumeCache[cacheKey] = aiData;

// } catch (err) {
//   console.log("🔥 FULL ERROR:", err);

//   source = "fallback";

//   aiData = {
//     name: "Demo User",
//     email: "demo@email.com",
//     atsScore: calculateATS(resumeText),
//     skillsFound: extractSkills(resumeText),
//     skillsMissing: ["Docker", "AWS"],
//     suggestions: ["Add projects", "Improve formatting"],
//     aiFeedback: "AI unavailable - fallback used",
//   };
// }

//     // ==========================
//     // 💾 Save to MongoDB
//     // ==========================
//     const newResume = new Resume({
//       name: aiData.name || "Unknown",
//       email: aiData.email || "Unknown",
//       fileName: req.file.originalname,
//       atsScore: aiData.atsScore || 0,
//       skillsFound: aiData.skillsFound || [],
//       skillsMissing: aiData.skillsMissing || [],
//       suggestions: aiData.suggestions || [],
//       aiFeedback: aiData.aiFeedback || "",
//     });

//     await newResume.save();

//     // ==========================
//     // 🧹 Delete File
//     // ==========================
//     fs.unlinkSync(filePath);

//     // ==========================
//     // ✅ Response
//     // ==========================
//     res.json({ ...aiData, source, _id: newResume._id });

//   } catch (err) {
//     console.error("🔥 Analysis failed:", err);

//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     res.status(500).json({
//       message: "Analysis failed",
//       error: err.message,
//     });
//   }
// });

// // ==========================
// // 📄 Download PDF Report
// // ==========================
// const PDFDocument = require("pdfkit");

// router.get("/download/:id", async (req, res) => {
//   try {
//     const resume = await Resume.findById(req.params.id);

//     if (!resume) {
//       return res.status(404).json({ message: "Resume not found" });
//     }

//     const doc = new PDFDocument();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=${resume.name}_report.pdf`
//     );

//     doc.pipe(res);

//     // 🧾 Content
//     doc.fontSize(20).text("SkillScan AI Report", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(14).text(`Name: ${resume.name}`);
//     doc.text(`Email: ${resume.email}`);
//     doc.text(`File: ${resume.fileName}`);
//     doc.text(`ATS Score: ${resume.atsScore}`);
//     doc.moveDown();

//     doc.text("Skills Found:");
//     resume.skillsFound.forEach(skill => doc.text(`- ${skill}`));

//     doc.moveDown();

//     doc.text("Skills Missing:");
//     resume.skillsMissing.forEach(skill => doc.text(`- ${skill}`));

//     doc.moveDown();

//     doc.text("Suggestions:");
//     resume.suggestions.forEach(s => doc.text(`- ${s}`));

//     doc.moveDown();

//     doc.text("AI Feedback:");
//     doc.text(resume.aiFeedback);

//     doc.end();

//   } catch (err) {
//     console.error("PDF Error:", err);
//     res.status(500).json({ message: "PDF generation failed" });
//   }
// });
// // ==========================
// // 📜 Get All Resume History
// // ==========================
// router.get("/all", async (req, res) => {
//   try {
//     const resumes = await Resume.find().sort({ createdAt: -1 });

//     res.json(resumes);
//   } catch (err) {
//     console.error("History Error:", err);
//     res.status(500).json({ message: "Failed to fetch history" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const PDFDocument = require("pdfkit");

const Resume = require("../models/resume");
console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
console.log("OPENAI_API_KEY value:", process.env.OPENAI_API_KEY?.slice(0,10));

// ✅ OpenAI Init
const OpenAI = require("openai").default;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ File upload
const upload = multer({ dest: "uploads/" });

// ==========================
// 🧠 ATS LOGIC (Fallback)
// ==========================
function calculateATS(text) {
  let score = 0;
  const skills = ["react", "node", "mongodb", "javascript", "html", "css"];

  skills.forEach(skill => {
    if (text.toLowerCase().includes(skill)) score += 15;
  });

  return Math.min(score, 100);
}

function extractSkills(text) {
  const skills = ["react", "node", "mongodb", "javascript", "html", "css"];
  return skills.filter(skill => text.toLowerCase().includes(skill));
}

// ==========================
// 🌐 GLOBAL CACHE + LIMIT
// ==========================
global.resumeCache = global.resumeCache || {};
global.requestCount = global.requestCount || 0;

// ==========================
// 🚀 Upload Route
// ==========================
router.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;

  try {
    // ==========================
    // 📄 Extract PDF Text
    // ==========================
    const dataBuffer = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjsLib.getDocument({
      data: dataBuffer,
      useSystemFonts: true,
    }).promise;

    let resumeText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      resumeText += content.items.map(item => item.str).join(" ") + " ";
    }

    // ==========================
    // 🚫 Request Limit (Cost Safety)
    // ==========================
    if (global.requestCount > 50) {
      return res.json({ message: "Daily API limit reached" });
    }
    global.requestCount++;

    // ==========================
    // 🤖 AI + Fallback
    // ==========================
    let aiData = {};
    let source = "AI";

    try {
      // ✅ Reduce input size
      const shortResume = resumeText.slice(0, 1200);

      // ✅ Cache check
      const cacheKey = shortResume.slice(0, 100);
      if (global.resumeCache[cacheKey]) {
        return res.json({
          ...global.resumeCache[cacheKey],
          source: "cache",
        });
      }

      // ✅ OpenAI Call (Optimized)
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Return ONLY JSON:
{
"name": "",
"email": "",
"atsScore": 0,
"skillsFound": [],
"skillsMissing": [],
"suggestions": [],
"aiFeedback": ""

}

Resume:
${shortResume}`,
          },
        ],
        max_tokens: 200, // 🔥 cost control
      });

      console.log("Tokens used:", completion.usage.total_tokens);

      const text = completion.choices[0].message.content;
      const cleaned = text.replace(/```json|```/g, "").trim();

      aiData = JSON.parse(cleaned);

      // ✅ Save cache
      global.resumeCache[cacheKey] = aiData;

    } catch (err) {
      console.log("🔥 AI ERROR:", err.message);

      source = "fallback";

      aiData = {
        name: "Demo User",
        email: "demo@email.com",
        atsScore: calculateATS(resumeText),
        skillsFound: extractSkills(resumeText),
        skillsMissing: ["Docker", "AWS"],
        suggestions: ["Add projects", "Improve formatting"],
        aiFeedback: "AI unavailable - fallback used",
      };
    }

    // ==========================
    // 💾 Save to DB
    // ==========================
    const newResume = new Resume({
      name: aiData.name || "Unknown",
      email: aiData.email || "Unknown",
      fileName: req.file.originalname,
      atsScore: aiData.atsScore || 0,
      skillsFound: aiData.skillsFound || [],
      skillsMissing: aiData.skillsMissing || [],
      suggestions: aiData.suggestions || [],
      aiFeedback: aiData.aiFeedback || "",
    });

    await newResume.save();

    // ==========================
    // 🧹 Delete File
    // ==========================
    fs.unlinkSync(filePath);

    // ==========================
    // ✅ Response
    // ==========================
    res.json({ ...aiData, source, _id: newResume._id });

  } catch (err) {
    console.error("🔥 Analysis failed:", err);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(500).json({
      message: "Analysis failed",
      error: err.message,
    });
  }
});

// ==========================
// 📄 Download PDF
// ==========================
router.get("/download/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Not found" });

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${resume.name}_report.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("SkillScan AI Report", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Name: ${resume.name}`);
    doc.text(`Email: ${resume.email}`);
    doc.text(`ATS Score: ${resume.atsScore}`);
    doc.moveDown();

    doc.text("Skills Found:");
    resume.skillsFound.forEach(s => doc.text(`- ${s}`));

    doc.moveDown();
    doc.text("Skills Missing:");
    resume.skillsMissing.forEach(s => doc.text(`- ${s}`));

    doc.moveDown();
    doc.text("Suggestions:");
    resume.suggestions.forEach(s => doc.text(`- ${s}`));

    doc.moveDown();
    doc.text("AI Feedback:");
    doc.text(resume.aiFeedback);

    doc.end();

  } catch (err) {
    res.status(500).json({ message: "PDF error" });
  }
});

// ==========================
// 📜 Get All History
// ==========================
router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch {
    res.status(500).json({ message: "Fetch error" });
  }
});

module.exports = router;