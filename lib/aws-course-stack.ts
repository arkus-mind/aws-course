import * as cdk from '@aws-cdk/core';
import { SingleInstance } from "./SingleInstance";
import { WithLoadBalancer } from "./WithLoadBalancer";
import { RDSPostgresql } from "./RDSPostgresql";

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

class AwsCourseRDSPostgresqlStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new RDSPostgresql(this, 'RDSPostgresql');
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
  case 'RDSPostgresql':
    InfrastructureStack = AwsCourseRDSPostgresqlStack
    break;
}

export {
  InfrastructureStack,
  InfrastructureType,
}

