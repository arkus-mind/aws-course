single-instance:
	export PRACTICE="SingleInstance" && cdk deploy --profile my-aws

with-loadbalancer:
	export PRACTICE="WithLoadBalancer" && cdk deploy --profile my-aws

