Community Node
======

This is a `docker-compose` service that sets up an Explorer and DNS Seeder. This allows community members to setup critical infrastructure in a very simple and robust fashion.

I would like to recommend using Digital Ocean's $10/month instance with Ubuntu 16. We appreciate your contributions to the community!

***Note: Do not keep cryptocurrency on this service. These types of services are a constant target for hackers.***


1\. Register a domain
-----
Register a domain name, then open your DNS settings and add an A record and an NS record that points to it. 

Example

```
Name     Type    TTL     Data
vps      A       1h      167.99.98.134
seed     NS      1h      vps.mydomain.org.
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
sudo chmod +x /usr/local/bin/docker-compose
```

Secure your server with `ufw`
```
ufw allow 22 
ufw allow 53
ufw allow 80
ufw allow 443
ufw enable
```


3\. Download
-------------------

Clone this repository
```
git clone https://github.com/Pigeoncoin/services.git
cd services/community-node
```

4\. Configure
--------------------
Then edit `docker-compose.yml` to reflect your DNS settings.
```
  seeder:
    environment:
      NS_ADDRESS: seed.mydomain.org
      A_ADDRESS: vps.mydomain.org
      EMAIL: contact@mydomain.org
```

5\. Launch
-----------------

```
docker-compose up -d --build
```

You'll see it build the service and then deploy it in the background. Well, that's about it! Take a water break, and then confirm the functionality.

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


Celebrate! 🎉
=============

You have just provided the community with a backup explorer and dns seeder. If you intend to leave this up for a year or longer, let us know and we'll add you to the hard-coded wallet seed nodes!
