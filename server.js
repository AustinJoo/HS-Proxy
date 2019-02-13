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
    listingID = req.url.slice(1);
    next();
})

app.get(`/${loaderKey}`, (req,res) => {
    res.send(loaderKey);
})

app.use('/api/items/:listingID', proxy({
    target: 'http://ec2-3-16-57-68.us-east-2.compute.amazonaws.com'
}));

app.use('/api/booking/:listingID', proxy({
    target: 'http://ec2-18-216-133-115.us-east-2.compute.amazonaws.com'
}))

app.get('/:listingID', (req, res) => {
    console.log('API CAROUSEL ENDPOINT IS: ', listingID);
    // NginX url
    // axios.get(`ec2-18-188-37-54.us-east-2.compute.amazonaws.com/api/pictures/${listingID}`)
    axios.get(`http://ec2-3-16-208-224.us-east-2.compute.amazonaws.com/api/pictures/${listingID}`)
    .then((response) => {
        let data = response.data;
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
                    <style type="text/css" id="carouselCSS">${carouselCSS}</style>
                    <link rel="stylesheet" type="text/css" media="screen" href="http://ec2-3-16-57-68.us-east-2.compute.amazonaws.com/style.css"/>
                    <link rel="stylesheet" type="text/css" media="screen" href="http://ec2-18-216-133-115.us-east-2.compute.amazonaws.com/style.css"/>
                    </head>
                    <body>
                    <div id="Components container">
                    <div>
                    <div id="image-carousel">${carouselHTML}</div>
                    </div>
                    <div>
                    <div id="app"></div>
                    </div>
                    <div id="applex"></div>
                    </div>
                    
                    <script src="http://ec2-3-16-208-224.us-east-2.compute.amazonaws.com/bundle/bundle.js"></script>
                    <script src="http://ec2-18-216-133-115.us-east-2.compute.amazonaws.com/dist/bundle.js"></script>
                    <script src="http://ec2-3-16-57-68.us-east-2.compute.amazonaws.com/dist/bundle.js"></script>
                    <script>
                    ReactDOM.hydrate(
                        React.createElement(ImageCarousel, ${JSON.stringify(carouselProps)}),
                        document.getElementById('image-carousel')
                    );
                    ReactDOM.render(
                        React.createElement(BookingModule),
                        document.getElementById('applex')
                    );
                    ReactDOM.render(
                        React.createElement(ReviewsModule),
                        document.getElementById('app')
                    );
                    </script>
                </body>
            </html>`
        )
    })
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});