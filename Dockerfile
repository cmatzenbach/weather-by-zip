# use official node image
FROM node

# create app dir on container and set as working dir
RUN mkdir /app
RUN mkdir /app/client
WORKDIR /app

# get package.json and install all dependencies
COPY package.json /app
RUN npm install
COPY client/package.json /app/client
WORKDIR /app/client
RUN npm install

WORKDIR /app

# move all files to container
COPY . /app

EXPOSE 3000

CMD ["npm", "start"]

