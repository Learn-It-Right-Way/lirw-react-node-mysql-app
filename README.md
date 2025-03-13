# Learn It Right Way
This project is a full-stack web application built using React js for the frontend, Express js for the backend, and MySQL as the database. The application is designed to demonstrate the implementation of a 3-tier architecture, where the presentation layer (React js), application logic layer (Express js), and data layer (MySQL) are separated into distinct tiers.


## User Interface Screenshots 
#### Dashboard
![Dashboard](./frontend/public/ss/dashboard.png)

#### Books
![Dashboard](./frontend/public/ss/books.png)

#### Authors
![Dashboard](./frontend/public/ss/authors.png)


## Connecting to private EC2 instance via a bastion host
1. To change the ssh key permission:

```bash
chmod 400 your_key.pem
```

2. To start ssh agent:

```bash
eval "$(ssh-agent -s)"  
```

3. To add key to ssh agent:

```bash
ssh-add your_key.pem
```

4. To ssh into bastion host with agent forwarding:

```bash
ssh -A ec2-user@bastion_host_public_ip
```

5. To connect private instance from the bastion host:

```bash
ssh ec2-user@private_instance_private_ip 
```

## Setting up the Data Tier
#### Install MySQL
1. To download MySQL repository package:

```bash
wget https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
```

2. To verify the package download:

```bash
ls -lrt 
```

3. To install MySQL repository package:

```bash
sudo dnf install -y mysql80-community-release-el9-1.noarch.rpm 
```

4. To import GPG key: 

```bash
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2023 
```

5. To update package index:

```bash
sudo dnf update –y 
```

6. To install MySQL server:

```bash
sudo dnf install -y mysql-community-server  
```

7. To start the mysql service:

```bash
sudo systemctl start mysqld
```

8. To enable mysql to start on boot:

```bash
sudo systemctl enable mysqld 
```

9. To secure the mysql installation:

```bash
sudo grep 'temporary password' /var/log/mysqld.log 

sudo mysql_secure_installation 
```

10. To create database and restore data, please refer SQL scripts on [db.sql](./backend/db.sql) file.


## Setting up the Application Tier
#### Install GIT
```bash
sudo yum update -y

sudo yum install git -y

git — version
```

#### Clone repository
```bash
git clone https://github.com/learnItRightWay01/react-node-mysql-app.git
```

#### Install node.js
1. To install node version manager (nvm)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

2. To load nvm
```bash
source ~/.bashrc
```

3. To use nvm to install the latest LTS version of Node.js
```bash
nvm install --lts
```

4. To test that Node.js is installed and running
```bash
node -e "console.log('Running Node.js ' + process.version)"
```

## Setting up the Presentation Tier
#### Install GIT
```
PLEASE REFER ABOVE
```

#### Clone repository
```
PLEASE REFER ABOVE
```

#### Install node.js
```
PLEASE REFER ABOVE
```

#### Install NGINX
```bash
dnf search nginx

sudo dnf install nginx

sudo systemctl restart nginx 

nginx -v
```

#### Copy react.js build files
```bash
sudo cp -r dist /usr/share/nginx/html 
```

#### Update NGINX config
1. Server name and root
```
server_name    domain.com www.subdomain.com
root           /usr/share/nginx/html/dist
```

2. Setup reverse proxy
```
location /api { 
   proxy_pass http://application_tier_instance_private_ip:3200/api; 
}
```

3. Restart NGINX
```
sudo systemctl restart nginx
```

## User data scripts
#### Install NGINX
For [AWS solutions - 06](https://youtu.be/snQlL0fJI3Q) and  [AWS solutions - 07](https://youtu.be/eRX1FI2cFi8)

```bash
#!/bin/bash 
# Update package lists 
yum update -y 

# Install Nginx 
yum install -y nginx 

# Stop and disable default service (optional) 
systemctl stop nginx 
systemctl disable nginx 

# Create a custom welcome message file 
echo "Welcome to Presentation Tier EC2 instance in Availability Zone B." > /usr/share/nginx/html/index.html 

# Start and enable the Nginx service 
systemctl start nginx 
systemctl enable nginx
```
To secure https connections and encrypt we make use of certbot

```bash
sudo dnf install python3 augeas-libs
```

```bash
sudo yum remove certbot
```

```bash
sudo python3 -m venv /opt/certbot/
```

```bash
sudo /opt/certbot/bin/pip install --upgrade pip
```
 
```bash
sudo /opt/certbot/bin/pip install certbot certbot-nginx
```

```bash
sudo ln -s /opt/certbot/bin/certbot/ /usr/bin/certbot
```

```bash
sudo certbot --nginx
```
###Once the certbot is installed, you can request and install the certificates into the nginx configuration.</br>
During this process it promts to enter email address which will be used for renewal and security patches</br>
Enter the email address and enter the email address or press c to cancel.</br>
Do you want to agree all the Terms & Conditions</br>
Yes or NO: press Y</br>
Would you be willing,Once your certificate is issued successfully can we share the email address with the Electronic Frontier Foundation, a founding partner of the Let's Encrypt project and the non-profit</br> organisation that develops Certbot.</br>
Enter Yes or No: Press Y</br>
You will get a message that your Account registered.</br>

Which names would you like to activate Https for:</br>
We recommend selecting either all domains, or all domains in a VirtualHost/server block.</br>
----------------------------------------------------------------------------------------</br>
1.radhasrinivas.com</br>
2.www.radhasrinivas.com</br>
----------------------------------------------------------------------------------------</br>
Select the appropriate numbers separated by commas and/or spaces, or leave input</br>
blank to select all options shown (Enter 'c' to cancel): 1 2 or    1,2</br>
post that you will be getting a message below</br>
Requesting a certificate for radhasrinivas.com and www.radhasrinivas.com</br>

Successfully received a certificate.</br>
This certificate expires on 2024-08-24</br>
These files will be updated when the certificate renews.</br>

Deploying certificate</br>
Successfully deployed certificate for radhasrinivas.com to /etc/nginx/nginx.conf</br>
Successfully deployed certificate for www.radhasrinivas.com to /etc/nginx/nginx.conf</br>
Congratulations! You have successfully enabled HTTPS on https://radhasrinivas.com and https://www.radhasrinivas.com</br>

Next Steps:</br>
- The certificate will need to be renewed before it expires.Certbot can automatically renew the certificate in the background, but you may need to take steps to enable that functionality.</br>
  See https://certbot.org/renewal-setup for instructions.</br>
--------------</br>
sudo systemctl restart nginx and try to search with the domain and the subdomain for which you have received ssl certificates.</br>

