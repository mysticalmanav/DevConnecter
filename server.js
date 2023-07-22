const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
//connect database
connectDB();
//init middleware
app.use(express.json({ extended: false }));
//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profiles"));

app.use("/api/posts", require("./routes/api/posts"));
//static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
