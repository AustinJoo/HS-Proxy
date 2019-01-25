const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');
const axios = require('axios');
const loaderKey = 'loaderio-9b819cf68f2ca338538ea376ed6c6143';

const app = express();

const port = process.env.PORT || 3030;
var listingID;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    // console.log(req.url);
    listingID = req.url.slice(1);
    next();
})

// app.use('/api/items', proxy({
//     target: ''
// }));

// app.use('/api/pictures/:listingID', proxy({
//     target: 'http://localhost:5050/api/pictures'
//     target: 'http://ec2-3-16-208-224.us-east-2.compute.amazonaws.com'
// }));

app.get(`/${loaderKey}`, (req,res) => {
    res.send(loaderKey);
})

app.get('/:listingID', (req, res) => {
    console.log('API CAROUSEL ENDPOINT IS: ', listingID);
    // axios.get(`http://localhost:5050/api/pictures/${listingID}`)
    axios.get(`ec2-18-188-37-54.us-east-2.compute.amazonaws.com/api/pictures/${listingID}`)
    // axios.get(`http://ec2-3-16-208-224.us-east-2.compute.amazonaws.com/api/pictures/${listingID}`)
    .then((response) => {
        let data = response.data;
        // console.log('THIS IS DATA: ', data);
        let carouselHTML = data[0];
        let carouselProps = data[1];
        let carouselCSS = data[2];
        res.send(
            `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                    <title>SSRDocument</title>
                    <<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
                    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
                    <style type="text/css">${carouselCSS}</style>
                    </head>
                    <body>
                    <div id="image-carousel">${carouselHTML}</div>
                    
                    <script src="http://ec2-3-16-208-224.us-east-2.compute.amazonaws.com/bundle/bundle.js"></script>
                    <script>
                        ReactDOM.hydrate(
                            React.createElement(ImageCarousel, ${JSON.stringify(carouselProps)}),
                            document.getElementById('image-carousel')
                        );
                    </script>
                </body>
            </html>`
        )
    })
});

{/* <script src="Justin'sComponent/bundle.js"></script> */}
{/* <script src="Alexa'sComponent/bundle.js"></script> */}

// app.use('/api/booking', proxy({
//     target: ''
// }))

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});