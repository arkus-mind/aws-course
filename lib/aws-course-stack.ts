import * as cdk from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';
import { EC2Instance } from "./instance";

export class AwsCourseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCourseQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    new EC2Instance(this, 'course');
  }
}
