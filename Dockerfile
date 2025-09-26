# ---- Base Stage ----
# We start with a lightweight, official Node.js image
FROM node:18-alpine AS base
# Inside the container, we'll create a folder for our app
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
# This stage is just for installing the required packages
FROM base AS deps
# Copy only the package files from your 'backend' folder
COPY backend/package*.json ./
# Install the packages. This is like running 'npm install' on your machine
RUN npm install

# ---- Production Stage ----
# This is the final stage that will create the container to be deployed
FROM base AS production
# Copy the installed packages from the 'deps' stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
# Copy all the other files from your 'backend' folder (generate.js, fonts, etc.)
COPY backend/ .

# Tell Coolify that your app uses port 3000 inside the container
EXPOSE 3000

# The final command to start your server when the container runs
CMD ["node", "generate.js"]