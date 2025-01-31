# Step 1: Use Node.js official image
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package.json ./
RUN npm install

# Step 4: Copy the rest of the app
COPY . .

# Step 5: Expose the port and start the app
EXPOSE 5001
CMD ["npm", "start"]
