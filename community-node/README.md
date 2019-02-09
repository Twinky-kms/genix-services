Helper
======

This is a `docker-compose` service that sets up an Explorer, Wallet, and DNS Seeder. This allows community members to setup critical infrastructure in a very simple and robust fashion.


1\. Register a domain
-----
Register a domain name, then open your DNS settings and add an A record and an NS record that points to it. 

Example

```
Name     Type    TTL     Data
vps      A       1h      167.99.98.134
seed     NS      1d      vps.mydomain.org.
```

2\. Install & secure Docker
------------------

[Install Docker CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

[Install docker-compose](https://docs.docker.com/compose/install/)
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Secure your server with `ufw`
```
ufw allow 22 53 80 443
ufw enable
```


3\. Download helper
-------------------

Clone this repository
```
git clone https://github.com/Pigeoncoin/services.git
cd services/helper
```

4\. Configure helper
--------------------
Then edit `docker-compose.yml` to reflect your DNS settings.
```
  seeder:
    environment:
      NS_ADDRESS: seed.mydomain.org
      A_ADDRESS: vps.mydomain.org
      EMAIL: contact@mydomain.org
```

5\. Launch helper
-----------------

```
docker-compose up -d --build
```

You'll see it build the service and then deploy it in the background. Well, that's about it! Take a break, possibly overnight, and confirm the functionality.

Confirm functionality
=====================

1\. A Record
------------

Use [DNS Checker](https://dnschecker.com) to... check your DNS!

https://dnschecker.org/#A/vps.mydomain.org should show your server IP.

```
Holtsville NY        167.99.98.134	
Canoga Park, CA      167.99.98.134	
Holtsville, NY       167.99.98.134	
Mountain View, CA    167.99.98.134
```

2\. NS Record & working seed
-------------------------------

https://dnschecker.org/#A/seed.mydomain.org should show multiple IPs, each is a healthy node!


```
Canoga Park, CA      122.155.219.130
                     35.167.6.101
                     149.56.240.19
                     138.197.15.79
                     192.99.19.160	

Mountain View, CA    173.212.247.217
                     39.104.204.137
                     217.182.138.181
                     78.128.77.167
                     149.56.240.19
```


3\. Explorer
------------

Visit http://vps.mydomain.org, where you will see a block Explorer.

*Note: it will start showing blocks within 5 minutes of installation, but may take 5-7 days to fully sync.*