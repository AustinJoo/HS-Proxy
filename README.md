# PeachiairBNB Proxy
This repo holds the information for a proxy server that integrates multiple full-stack components to render a complete listing page to a client application modeled off a real listing page from popular hospitality site airbnb.com. 

When called, this proxy will first send a request with a listing ID (ranging from 0 to 9,999,999) from the client to the image carousel component. This component -which serves as a RESTful API- will take this ID and contact a MongoDB to retrieve a document with the corresponding _id property as the request's listing ID._ The API responds with a stringified array of objects which are loaded into an HTML template to be sent to the client application to load the full listing page. 

Prior to the HTML response is ready to be sent to the client application to be rendered, the bundle files of the other components are loaded. The same listing ID as eariler is passed through the bundles and the other components of the page are loaded. With all three components now loaded, rendered, and hydrated at the HTML response, the entire HTML code block is sent through to the client to be rendered as a complete listing page.

There are 2 ways of setting up and running this service to run on a deployed service instance; one requires the use Docker and the other does not. The steps for each are listed below.

## Setup (No Docker)
- **Dependencies**
  - Node and Express frame work for web
- **Setup steps**
 1) Create a service to run instance
    - Ubuntu 18.04 recommended 
 2) Allow traffic on ports 22 (SSH) and 80 (HTTP)
 3) Create SSH connection  
 4) Install [Node](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) and [Git](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04)
 5) Run command "git clone https://github.com/PeachiairBNB/HS-Proxy.git"
 7) Run command "sudo npm install"
 8) Run command "npm start"
 9) Service should be up and running!

## Setup (Docker)
- **Setup steps**
 1) Create a service to run instance
    - Ubuntu 18.04 recommended
 2) Allows traffic to ports 22 (SSH) and 80 (HTTP)
 3) Create SSH connection
 4) Install and configure [Node](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) and [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
 5) Run command "sudo docker login" and login
 6) Run command "sudo docker pull austinjoo/sdc-proxy-final"
 7) Run command "sudo docker run -p 80:3030 -d austinjoo/sdc-proxy-final"
 8) Service should be up and running!
- **Notes**:
  - Running the commands "sudo docker ps" will tell you all images running. The port 80 must be free to use this image. Running the command "sudo docker container stop [CONTAINER ID]" will stop the current image and free up port 80
 
## The Team 
**Developers**
- [Justin Poser](https://github.com/CodeNoob25) 
  - [Booking](https://github.com/PeachiairBNB/jp-extracted-server-code)
- [Alexa Marshall](https://github.com/aLeX-c-m) 
  - [Reviews](https://github.com/aLeX-c-m/PL-module)

**Technical Mentor**
- [Trenton Going](https://github.com/trentgoing)
