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

 # Migration of Database
 
 This app uses a local database instead of an external data server. The database files are stored in mongo. The following operations require meteor to be running in another terminal

 ```sh
 $ meteor
 ```

 To back up the collections:

 ```sh
 $ mongodump -h 127.0.0.1 --port 3001 -d meteor
 ```

This will create a 'dump' directory inside the current folder. To recover the collections using this dump:

```sh
$ mongorestore -h 127.0.0.1 --port 3001 -d meteor dump/meteor
```

This should restore the database if run successfully.

By migrating the files inside here, you will be able to recover the data stored locally.

 # Depoly to production
 
 To deploy follow the standard procedure of launching the meteor app with nohup
 
```sh
$ nohup meteor run --production
# [ctrl] + [z] // puts on stop in the background
$ bg
# [ctrl] + [d] // exits the ssh connection
```

You can check on the server output even after launching the instance in the background:

```sh
$ tail -f nohup.out
```

[sticky iptable]: <https://askubuntu.com/questions/119393/how-to-save-rules-of-the-iptables>
