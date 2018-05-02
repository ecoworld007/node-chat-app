const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;

let app = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(PORT,() => {
    console.log('server listening on '+PORT);
});


