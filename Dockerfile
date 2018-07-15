FROM node:alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

ADD package.json /app/package.json
ADD build/ /app/
ADD src/ /app/
ADD typings/ /app/

# Bundle app source
#COPY . /app
RUN npm install

EXPOSE 5000
CMD ["npm", "start"]
