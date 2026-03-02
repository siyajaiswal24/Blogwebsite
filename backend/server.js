const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Blog = require("./models/Blog");
const mockBlogs = require("./data/mockBlogs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

async function startServer() {
  // Connect DB first
  await connectDB();

  // Insert mock data only once
  const count = await Blog.countDocuments();
  if (count === 0) {
    await Blog.insertMany(mockBlogs);
    console.log("✅ Mock blogs inserted");
  }

  // Start server
  app.listen(5050, () => {
    console.log("🚀 Server running on port 5050");
  });
}

startServer();
