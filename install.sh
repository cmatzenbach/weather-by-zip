#!/bin/bash

# run npm install for backend dependencies
npm install

# switch to client folder and install react dependencies
cd client/
npm install

# switch back to root folder and run application
cd ../
npm run dev
