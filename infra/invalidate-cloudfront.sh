#!/bin/bash

ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?ends_with(@,'monorepo-toy-project.com')]].Id" | jq -r '.[0]')
aws cloudfront create-invalidation --distribution-id $ID --paths "/*"

