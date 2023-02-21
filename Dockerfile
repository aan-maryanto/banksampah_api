FROM node:12.22-alpine
# create app directory
WORKDIR /home/aan/work-dir
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]