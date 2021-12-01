import * as cdk from '@aws-cdk/core';
import { SingleInstance } from "./SingleInstance";
import { WithLoadBalancer } from "./WithLoadBalancer";

class AwsCourseSingleInstanceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new SingleInstance(this, 'SingleInstance');
  }
}

class AwsCourseWithLoadBalancerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new WithLoadBalancer(this, 'WithLoadBalancer');
  }
}

let InfrastructureStack: any;
const InfrastructureType = process.env.PRACTICE;
switch (InfrastructureType) {
  case 'SingleInstance':
    InfrastructureStack = AwsCourseSingleInstanceStack
    break;
  case 'WithLoadBalancer':
    InfrastructureStack = AwsCourseWithLoadBalancerStack
    break;
}

export {
  InfrastructureStack,
  InfrastructureType,
}

