#  Dockerfile for  Backend

FROM node:18.12.1

# Create App Directory
RUN mkdir -p /app
WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install 

RUN npm install -g nodemon
# Copy app source codedocke
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","run","dev"]
