import { type SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
// import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export default {
  config(_input) {
    return {
      name: "monorepo-ui",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const certificate = acm.Certificate.fromCertificateArn(
        stack,
        "Certificate",
        `arn:aws:acm:eu-central-1:748493488945:certificate/e21efb4c-be03-4a20-a160-e481b17d9670`
      );

      const site = new NextjsSite(stack, "site", {
        customDomain: {
          isExternalDomain: true,
          domainName: "ui.monorepo-toy-project.com",
          cdk: {
            certificate,
          },
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
