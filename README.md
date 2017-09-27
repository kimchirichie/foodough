# Foodough

Foodies can now track their food spending along with other expenses with the use of foodough!

# Setup

First thing to remember is to install meteor and run the packagemanager before running the server

```sh
$ curl https://install.meteor.com/ | sh
$ cd path/to/project
$ meteor npm install
$ meteor --allow-superuser #option when running root
```

Alternatively, you may set the environment variable

```sh
$export METEOR_ALLOW_SUPERUSER='true'
```

If the previous process of installations run without problem, next setup the iptable to forward port 80 to 3000. (run as root)

```sh
# iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
```

To make iptable rules stick, install the iptable tool (following the instructions of [sticky iptable])

```sh
# apt-get install iptables-persistent
# netfilter-persistent save
```

 # Depoly to production
 
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
$ meteor
```

# Backup/Restoration of Database
 
To backup the collections:

```sh
$ mongodump -h 127.0.0.1 --port 3001 -d meteor
```

This will create a 'dump' directory inside the current folder. To recover the collections using this dump:

```sh
$ mongorestore -h 127.0.0.1 --port 3001 -d meteor dump/meteor
```

This should restore the database if run successfully.

By migrating the files inside here, you will be able to recover the data stored locally.