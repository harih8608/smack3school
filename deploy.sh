#!/bin/bash

# Define the EC2 instance IP address and .pem key file path
EC2_IP=3.145.92.246
PEM_FILE=/c/Users/DELL/Downloads/smack3school-key.pem

# Connect to the EC2 instance and navigate to the project directory
ssh -i $PEM_FILE ec2-user@$EC2_IP "cd ~/myproject"

# Stop any existing instances of the Node.js server
ssh -i $PEM_FILE ec2-user@$EC2_IP "pm2 stop index"

# Delete the contents of the project directory on the EC2 instance
ssh -i $PEM_FILE ec2-user@$EC2_IP "rm -rf ~/myproject/*"

# Copy the local project files to the project directory on the EC2 instance
scp -i $PEM_FILE -r ./* ec2-user@$EC2_IP:~/myproject

# Install project dependencies and start the Node.js server using pm2
ssh -i $PEM_FILE ec2-user@$EC2_IP "cd ~/myproject && npm install && pm2 start index.js"

