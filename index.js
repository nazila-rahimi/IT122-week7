import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;  

// Home route- http://localhost:3000
app.get("/", (req, res) => {
  res.send("<h1>Welcome to IT122 class!</h1>");
});

// About route- http://localhost:3000/about
app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is Nazila Rahimi. I am learning web development.</p>");
});

// 404 route- any other path
app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
