FROM node:16.15.1-alpine
# create app directory
RUN mkdir -p /apps/
WORKDIR /apps
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 3000
# run on dev mode
CMD ["npm", "run", "dev"]