const express = require('express'),
      path    = require('path'),
      port    = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname + '/dist/index.html')) );

app.listen(port, () => console.log(`Server app running on port ${port}`));