import * as ec2 from '@aws-cdk/aws-ec2';
import * as core from '@aws-cdk/core';

// Crea una instancia, abre puertos 22, 80, 442, e instala apache
export class SingleInstance extends core.Construct {
    constructor(scope: core.Stack, id: string) {
        super(scope, id);
        const vpc = new ec2.Vpc(this, 'vpc-aws-course', {
            cidr: '10.0.0.0/16',
            subnetConfiguration: [
                {
                    name: 'public',
                    cidrMask: 24,
                    subnetType: ec2.SubnetType.PUBLIC,
                }
            ]
        });

        const securityGroup = new ec2.SecurityGroup(this, 'security-group-aws-course', {
            vpc,
            allowAllOutbound: true,
        });

        securityGroup.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(22),
            ' 22 port ssh'
        );

        securityGroup.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(80),
            ' 80 port http'
        );

        securityGroup.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(443),
            ' 443 port https'
        );

        const ubuntuInstance = ec2.MachineImage.genericLinux({
            'us-west-1': 'ami-053ac55bdcfe96e85',
        })

        const userData = ec2.UserData.forLinux()
        userData.addCommands(
            'sudo apt update',
            'sudo apt install -y apache2',
            'sudo service apache2 start',
            'sudo echo "<h1>(SingleInstance) Instance IP -----> $(hostname -f)</h1>" > /var/www/html/index.html',
        )

        new ec2.Instance(this, 'ec2-instance-aws-course', {
            vpc,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
            },
            securityGroup,
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.MICRO
            ),
            machineImage: ubuntuInstance,
            userData,
        })
    }
}
