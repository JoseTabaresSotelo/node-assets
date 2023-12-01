
<h1 align="center">Northwind database for Postgres</h1>

## 🧐 About <a name = "about"></a>

A vary basic and simple SQL script that will populate a database with Northwind, tailored for Postgres.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will give you the ability to have the database mounted

## Prerequisites

You will need to have install postgres SQL 14

- [Linux on windows ](https://learn.microsoft.com/en-us/windows/wsl/install) - WSL 2
- [PostgreSQL Tools ](https://www.pgadmin.org/download/) - pgAdmin
- [Postgres SQL 14 ](https://www.postgresql.org/ftp/source/v14.10/) - Database pgAdmin 



## Manual installation

### WSL

To set it up, your system must be running Windows 10 version 2004 or a newer version, or it should be running Windows 11.If you have an older version, please refer this [manual ](https://learn.microsoft.com/en-us/windows/wsl/install-manual)

Now, you have the option to install all the necessary components for running Windows Subsystem for Linux (WSL) using a single command. 
To do this, open PowerShell or the Windows Command Prompt with administrator privileges (right-click and choose "Run as administrator"). Input the command `wsl --install`, and after that, restart your computer.

After restarting your computer, launch the Windows Subsystem for Linux (WSL) with administrator privileges. You will then be prompted to set up a username and password for your Linux distribution.

This account will be designated as the Linux administrator, granting the capability to execute sudo (Super User Do) administrative commands.


### PostgreSQL

Prior to installing PostgreSQL, you need to execute the following command `sudo apt update && sudo apt upgrade`.
If you get the _Temporary failure resolving error_ you have to change the DNS.

Type `sudo nano /etc/resolv.conf` in that file, modify the IP address to 8.8.8.8, save the changes, and then execute the update and upgrade commands again.

Type this command: `sudo apt install postgresql postgresql-contrib` </br> 
Once installed, you'll primarily utilize these three commands for working with PostgreSQL:

- `sudo service postgresql start` to initiate the database, it will prompt you for the WSL root key.
- `sudo service postgresql statu` to know the status of the database.
- `sudo service postgresql stop` to stop the database


Upon PostgreSQL installation, an admin user is automatically generated, requiring a password for database access. To set the password, follow these steps:

- Use `sudo passwd postrgress`
- When prompted in the terminal, provide your system password.
- In conclusion, restart the terminal by closing it and then reopening it.

If everything is accurate, to enter and utilize the psql shell, follow these steps:

- Commence the PostgreSQL service by using the specified command `sudo service postgresql start`
- Access the PostgreSQL service and launch the psql shell using the following command: `sudo -u postgres psql`
- If everything is set up correctly, you should observe in the terminal that it initiates with the command line: `postgress=#`


### Establishing a connection from Windows pgAdmin to WSL2 PostgreSQL.


After finishing the PostgreSQL installation, download and install [pgAdmin ](https://www.pgadmin.org/download/). Make sure the PostgreSQL service is up before proceeding.

- Launch pgAdmin. Once inside, initiate the process of creating a server by right-clicking on **Servers – Register – Server**
![Register server image](https://i.imgur.com/eZCyvgP.png)

- In the General tab, input the server's name in the designated "Name" field.
![Database name image](https://i.imgur.com/Wa9tHiU.png)

- In the Connection tab, enter the host name/address as 127.0.0.1.
![Database name image](https://i.imgur.com/tVAR2yF.png)

In case you receive the following error.
![Connection field image](https://i.imgur.com/PlBFKbw.png) </br>
Please follow the following steps to reset the password

- Type `sudo -i -u postgres`
- Then `psql`
- To reset the default pasword type `\password postgres`
- Then the terminal will ask you type a new password

Once you have completed the above steps to reset your password, return to pgAdmin and in the password section you should enter the new password.

If the process was carried out properly you will be able to see the active server.
![Connection field image](https://i.imgur.com/bx5on99.png)


### Create and populate the database

- To establish the database, simply right-click on the section dedicated to databases then type the name of the database
  ![Create database image](https://i.imgur.com/zHMJCIK.png) </br>

Once you have created the database, you need to right click on the new one, then CREATE script and copy the code from the _nortwhind.sql_ file and paste it into the script file and execute it.


- [Nortwhind file](https://github.com/JoseTabaresSotelo/node-assets/blob/main/packages/northwind-database/northwind.sql) - file path


If the process was successful you will see a message like this: `Query returned successfully in 3 secs 429 msec.` And finally yoy are able to see the database populate on Schema section and run the file you will be able to see the tables and run the queries. </br>
![Create database image](https://i.imgur.com/CRQvtYW.png)

<hr/>