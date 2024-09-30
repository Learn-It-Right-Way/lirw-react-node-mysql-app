#!/bin/bash

# Ensure the backend directory exists
echo "Ensuring the backend directory exists..."
sudo mkdir -p /srv/react-node-mysql-app/backend
echo "Backend directory is ready at /srv/react-node-mysql-app/backend"

# Clear all files and hidden files in the backend directory
echo "Clearing all files and hidden files in the backend directory..."
sudo rm -rf /srv/react-node-mysql-app/backend/{*,.*} 2>/dev/null
echo "All files and hidden files have been cleared from the backend directory"
