import * as pj from 'projen';
import * as pjcontrib from '../projen-contrib';

const CONSTRCUTS_VERSION = '3.2.34';

export class Cdk8sCli {

  public readonly project: pj.TypeScriptProject;

  constructor(root: pjcontrib.YarnMonoRepoProject) {

    this.project = root.addTypeScriptPackage(this.packagePath, {
      name: 'cdk8s-cli',
      description: 'CDK for Kubernetes CLI',
      bin: {
        cdk8s: 'bin/cdk8s'
      },
      deps: [
        'cdk8s@0.0.0',
        'codemaker',
        `constructs@^${CONSTRCUTS_VERSION}`,
        'fs-extra',
        'jsii-srcmak',
        'jsii-pacmak',
        'sscaff',
        'yaml',
        'yargs',
        'json2jsii'
      ],
      devDeps: [
        '@types/fs-extra',
        '@types/json-schema',
      ],

    })

    // add @types/node as a regular dependency since it's needed to during "import"
    // to compile the generated jsii code.
    this.project.addDeps('@types/node');

    this.project.eslint!.addIgnorePattern('/templates/');
    this.project.jest!.addIgnorePattern('/templates/');

  }

  public get packagePath(): string {
    return 'packages/cdk8s-cli';
  }

}