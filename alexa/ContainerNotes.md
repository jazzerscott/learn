docker build . -t learn-alexa
docker rmi learn-alexa

docker compose up -d

docker exec -it 94bc47488fc7 /bin/bash
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Command}}\t{{.Status}}\t{{.Names}}"

lsof -i tcp:8200  finds the pid that is running a particular port