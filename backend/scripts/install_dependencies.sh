#!/bin/bash

# Navigate to the backend directory
echo "Navigating to the backend directory..."
cd /srv/react-node-mysql-app/backend
echo "Successfully navigated to /srv/react-node-mysql-app/backend"

# Run npm install
echo "Running npm install to install dependencies..."
npm install
echo "npm install completed successfully"
