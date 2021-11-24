import * as ec2 from '@aws-cdk/aws-ec2';
import * as core from '@aws-cdk/core';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53targets from '@aws-cdk/aws-route53-targets';

export class EC2Instance extends core.Construct {
    constructor(scope: core.Stack, id: string) {
        super(scope, id);

        const vpc = new ec2.Vpc(this, 'vpc-aws-course', { natGateways: 1 });

        const alb = new elbv2.ApplicationLoadBalancer(this, 'alb', {
            vpc,
            internetFacing: true,
        });

        const listener = alb.addListener('Listener', {
            port: 80,
            open: true,
        });

        const userData = ec2.UserData.forLinux();
        userData.addCommands(
            'sudo apt update',
            'sudo apt install -y apache2',
            'sudo service apache2 start',
            'sudo echo "<h1>Instancia IP -----> $(hostname -f)</h1>" > /var/www/html/index.html',
        );

        const ubuntuMachineImage = ec2.MachineImage.genericLinux({
            'us-west-1': 'ami-053ac55bdcfe96e85',
        })

        const asg = new autoscaling.AutoScalingGroup(this, 'asg', {
            vpc,
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.NANO,
            ),
            machineImage: ubuntuMachineImage,
            userData,
            minCapacity: 4,
            maxCapacity: 8,
        });

        listener.addTargets('default-target', {
            port: 80,
            targets: [asg],
            healthCheck: {
                path: '/',
                unhealthyThresholdCount: 2,
                healthyThresholdCount: 5,

            },
        });


        asg.scaleOnRequestCount('requests-per-minute', {
            targetRequestsPerMinute: 60,
        });

        asg.scaleOnCpuUtilization('cpu-util-scaling', {
            targetUtilizationPercent: 75,
        });

        new core.CfnOutput(this, 'albDNS', {
            value: alb.loadBalancerDnsName,
        });

        // const route53_hosted_zone = route53.HostedZone.fromLookup(this, 'MyZone', {
        //     domainName: 'muarkusnexus.com'
        // })
        //
        // new route53.ARecord(this, 'AliasRecord', {
        //     zone: route53_hosted_zone,
        //     target: route53.RecordTarget.fromAlias(new route53targets.LoadBalancerTarget(alb)),
        //     recordName: 'muarkusnexus.com'
        // })

    }
}
