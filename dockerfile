FROM node:18.12-alpine3.16

# create work directory

WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY --chown=${group}:${user} . 

#Run npm install
RUN npm install

#Bundle app sources
COPY . .

EXPOSE 3000

CMD [ "npm","start" ]