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

If the previous process runs through without problem, next setup the iptable to forward port 80 to 3000. (run as root)

```sh
# iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
```

To make iptable rules stick, install the iptable tool (following the instructions of [sticky iptable])

```sh
# apt-get install iptables-persistent
# netfilter-persistent save
```

 # Migration of Database
 
 This app uses a local database instead of an external data server. The database files are stored in `path/to/project/.meteor/local/db`. By migrating the files inside here, you will be able to recover the data stored locally.
 
[sticky iptable]: <https://askubuntu.com/questions/119393/how-to-save-rules-of-the-iptables>
