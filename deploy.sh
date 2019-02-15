docker build -t moh12594/multi-client:latest -t moh12594/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t moh12594/multi-server:latest -t moh12594/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t moh12594/multi-worker:latest -t moh12594/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push moh12594/multi-client:latest
docker push moh12594/multi-server:latest
docker push moh12594/multi-worker:latest

docker push moh12594/multi-client:$SHA
docker push moh12594/multi-server:$SHA
docker push moh12594/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=moh12594/multi-server:$SHA
kubectl set image deployments/client-deployment client=moh12594/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=moh12594/multi-worker:$SHA