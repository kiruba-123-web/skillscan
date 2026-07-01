// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// /* ===========================
//    Middleware
// =========================== */

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ===========================
//    MongoDB Connection
// =========================== */

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log("MongoDB Connection Failed", err);
//   });

// /* ===========================
//    Routes
// =========================== */

// const resumeRoutes = require("./routes/resumeRoutes");

// app.use("/api/resume", resumeRoutes);

// /* ===========================
//    Test Route
// =========================== */

// app.get("/", (req, res) => {
//   res.send("SkillScan AI Backend Running");
// });

// /* ===========================
//    Server Start
// =========================== */

const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("URI:", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

// ✅ FIXED HERE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});