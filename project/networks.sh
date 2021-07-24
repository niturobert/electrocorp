#!/bin/bash

# Create the Networks.
docker network create -d overlay --subnet=172.22.1.0/24 --gateway=172.22.1.1 --ip-range=172.22.1.0/24 --driver=bridge www
docker network create -d overlay --subnet=172.22.2.0/24 --gateway=172.22.2.1 --ip-range=172.22.2.0/24 --driver=bridge api
docker network create -d overlay --subnet=172.22.3.0/24 --gateway=172.22.3.1 --ip-range=172.22.3.0/24 --driver=bridge admin
docker network create -d overlay --subnet=172.22.4.0/24 --gateway=172.22.4.1 --ip-range=172.22.4.0/24 --driver=bridge database
docker network create -d overlay --subnet=172.22.5.0/24 --gateway=172.22.5.1 --ip-range=172.22.5.0/24 --driver=bridge mail


# Set up the IP routing.
docker exec --privileged project_api_1 ip route add 172.22.4.0/24 via 172.22.4.1 dev eth0 onlink
docker exec --privileged project_database_1 ip route add 172.22.2.0/24 via 172.22.2.1 dev eth0 onlink