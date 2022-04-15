const express = require("express");
// eslint-disable-next-line no-unused-vars
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "build")));

// This route serves the React app
app.get('/*', (req, res) => {
    let url = path.join(__dirname, 'build', 'index.html');
    if (!url.startsWith('/app/')) // we're on local windows
      url = url.substring(1);
    res.sendFile(url);
  });

app.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}`));