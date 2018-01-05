# Foodough

Foodies can now track their food spending along with other expenses with the use of foodough!

# Setup

First thing to remember is to install meteor and run the packagemanager before running the server

```sh
$ curl https://install.meteor.com/ | sh
$ cd path/to/project
$ meteor npm install
$ meteor
```

# No Nginx setup

Nginx would be the ideal way to proxy requests for the client. However if you are feeling lazy and not setting up nginx (which you should), the following allows traffic through.

If the previous process of installations run without problem, next setup the iptable to forward port 80 to 3000. (run as root)

```sh
# iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
```

To make iptable rules stick, install the iptable tool (following the instructions of [sticky iptable])

```sh
# apt-get install iptables-persistent
# netfilter-persistent save
```

# Deploy to production
 
 To deploy follow the standard procedure of launching the meteor app with `meteor build`. You must have the right node version to avoid errors on build. Check official meteor for the node version corresponding to the meteor build.
 
```sh
$ npm install --production
$ meteor build /path/to/build --architecture os.linux.x86_64
```

This should output a `myapp.tar.gz` file for production. Extract the file and use `forever.js` to spin the server up.

```sh
# npm install -g forever
$ forever start main.js
```

# Environment Variables

Several secure variables are required to operate the database and the emailing. Store them in the bashrc file.

```sh
$ nano ~/.bashrc
...
export MONGO_URL='mongodb://localhost:27017/meteor'
export ROOT_URL='http://money.kimchirichie.com'
export PORT='3000'
export EMAIL='myemail@gmail.com'
export PASSWORD='mypw'
```

# Mongo DB

Just like any other project the database server is external to the project. The database is run by `mongod` but to launch on startup and start run the following:

```sh
# systemctl enable mongod.service 
# systemctl start mongod.service
```

The following will run on port 27017 by default. Connect to the database through shell:

```sh
$ mongo
```

# Backup/Restoration of Database
 
To backup the `foodough` collections into `/foodough/dump`:

```sh
$ mongodump -d foodough -o /foodough/dump
```

The host ip and port can be specified with `-h 127.0.0.1:3001`. Default port is 27017 This will create a 'dump' directory inside the current folder. To recover the collections using this dump:

```sh
$ mongorestore -d foodough dump/meteor
```

This should restore the database if run successfully.

By migrating the files inside here, you will be able to recover the data stored locally.

# Automated daily backup

To automate the backup procedure, create a bash script of such:

```sh
#!/bin/sh
DIR=`date +%m%d%y`
DEST=/foodough/db_backup/$DIR
mkdir $DEST
mongodump -h 127.0.0.1 -d foodough -o $DEST
```

then put the cronjob to work:

```
$ sudo crontab -e
* 0 * * * /bin/sh /foodough/backup.sh
```