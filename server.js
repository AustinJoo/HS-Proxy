const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');


const app = express();

const port = process.env.PORT || 3030;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/:listingID', express.static(path.join(__dirname, '/public')));

// app.use('/api/items', proxy({
//     target: ''
// }));

app.use('/api/pictures', proxy({
    target: 'http://ec2-3-16-208-224.us-east-2.compute.amazonaws.com'
}));

// app.use('/api/booking', proxy({
//     target: ''
// }))

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});