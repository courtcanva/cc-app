# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build
# The server listens at PORT 8080
EXPOSE 3001

# Start the server using the production build
CMD ["npm", "run", "start", "--", "-p", "3001"]
