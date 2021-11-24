# Arquitectura en la nube
## AWS/CDK


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Pasos para correr el proyecto
* Crear una cuenta de AWS
* `npm i -g aws-cli` Instalar aws-cli
* Crear un usuario en AWS IAM con permisos programaticos
* ![image](https://user-images.githubusercontent.com/7213379/143156132-3f547045-62cc-45f5-a9c9-69c20a2748cc.png)
* `aws configure --profile my-aws` Poner ACCESS KEY y el SECRECT KEY, con su region us-west-1
* `npm i -g aws-cdk` Instalar aws-cdk

## Comandos para el proyecto
* `make` Crea el stack del proyecto
* `cdk destroy` Destruye el stack del proyecto

## Objetivo Principal
![image](https://user-images.githubusercontent.com/7213379/143146596-67682471-1912-43b4-8b2b-42110f27c53e.png)

## Semana 1 [Base de la arquitectura en la nube]
### Conceptos
* CDN
* Load Balancer
* Escalado Horizontal
* Escalado Vertical
* Cache
* Replicacion de datos
* DNS
* Logging
* Metrics
* Monitoring
* Automation

## Seamana 2 [Servicios AWS y Practicas CDK]
### Servicios
* EC2
* SecurityGroup
* VPC
* Route53
* IAM
* Subnets
* LoadBalancer [Application Load Balancer | Classic Load Balancer]
* Target Groups [Application Load Balancer]
* Auto Scaling Group
* Amplify [Extra]



