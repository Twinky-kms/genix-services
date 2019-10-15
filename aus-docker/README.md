# AustraliaCash Docker

This is a base docker image that can be used to build services on top of `australiacashd`

https://cloud.docker.com/repository/docker/lukepighetti/pigeon-docker/general


If you are in a secured environment and need to allow access to any IP 
address (a seemingly common situation in Docker apps), you may set `RPC_ALLOW_IP=0.0.0.0/0`.

This can be very dangerous for an exposed wallet as it will allow anyone to login to your node
if they have the username and password.