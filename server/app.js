const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Apply CORS middleware

// app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));

// Start the Express server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});