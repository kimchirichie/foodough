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
export MONGO_URL="mongodb://localhost:27017/foodough"
export ROOT_URL="http://money.kimchirichie.com"
export MAIL_URL="smtps://foodoughbot@gmail.com:<my_password>@smtp.gmail.com:465/"
export PORT=3000
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

# HTTPS with nginx ssl


ACME.sh is a free Automated Certificate Management Environment that registers certificates through Let's Encrypt Certificate Authority. To install run:

```sh
# curl https://get.acme.sh | sh
```


To simplify setup, we use standalone method of registering the domain to our IP. Remembering that the standalone procedure requires port 80 to be open, we simply use `--httpport` to specify an alternate port:

```sh
$ sudo su
# service nginx stop
# acme.sh --issue --standalone --httpport 88 -d example.com -d www.example.com
# service nginx start
```

which will store the generated files in `~/.acme.sh/example.com/`. Copy the folder into `/var/www/cert/` and change permissions. Proceed to specify the cert and key paths in `nginx.conf` reference guides to [setup nginx ssl](http://nginx.org/en/docs/http/configuring_https_servers.html) and [forward http to https](https://www.bjornjohansen.no/redirect-to-https-with-nginx). Then reload nginx server

```sh
# cp -r ~/.acme.sh/example.com /var/www/cert/
# chmod 660 -r /var/www/cert/example.com
...
    ##modify nginx.conf
...
# service nginx reload
```

if the setup was successful, nginx will now be using SSL (TLS) to encrypt http communications. However this environment does not renew the certificate automatically. To setup auto-renew run the acme script again

```sh
acme.sh --install-cert -d example.com
  --key-file       /var/www/cert/example.com/example.com.key
  --fullchain-file /var/www/cert/example.com/fullchain.cer
  --reloadcmd     "service nginx force-reload"
```

This will auto-renew the certificate every 60 days by default.
