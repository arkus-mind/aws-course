import * as ec2 from '@aws-cdk/aws-ec2';
import * as rds from '@aws-cdk/aws-rds';
import * as cdk from '@aws-cdk/core';
import * as core from "@aws-cdk/core";
import {ISecret, Secret} from '@aws-cdk/aws-secretsmanager';

export class RDSPostgresql extends core.Construct {
    constructor(scope: core.Stack, id: string) {
        super(scope, id);
        const secret = Secret.fromSecretNameV2(this, 'username',
            'rwar/test-DLipTZ',

        );

        let v = secret.secretValueFromJson('username').toString()
        console.log('===============================================')
        console.log(v.toString())
        console.log('===============================================')
    }
}
