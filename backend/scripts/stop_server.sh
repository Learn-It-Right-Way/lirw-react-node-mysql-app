#!/bin/bash

# Stop the Node.js server using pm2
echo "Attempting to stop the Node.js server using pm2..."
pm2 stop nodeapp-backend || echo "No pm2 process found with name 'nodeapp-backend'"


# Delete the process from the pm2 list
echo "Attempting to delete the Node.js process from the pm2 list..."
pm2 delete nodeapp-backend || echo "No pm2 process found with name 'nodeapp-backend'"


echo "PM2 stop and delete process completed"
