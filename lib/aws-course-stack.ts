import * as cdk from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';
import { Practica2 } from "./Practica2";
import { Practica1 } from "./Practica1";

export class AwsCourseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    switch (process.env.PRACTICA) {
      case "2":
        console.log('Empezando deploy practica 1');
        new Practica2(this, 'Practica1');
        break;
      case "1":
        console.log('Empezando deploy practica 2');
        new Practica1(this, 'Practica2');
        break;
    }
  }
}
