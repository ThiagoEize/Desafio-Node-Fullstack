# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Install Prisma client.
RUN npx prisma generate

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]
