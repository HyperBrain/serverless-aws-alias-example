# Serverless test project

This project uses some central functionality of Serverless and
shows how the alias plugin works.

You can deploy the available branches `master` and `warmup-apig` to different
aliases. The branches have different configurations:

### master

Simple Lambda function + DynamoDB table + DynamoDB event source

### warmup-apig

The warmup branch simulates feature development in a project perspective as well
as developer changes in the Serverless configuration.

The DynamoDB is removed in this branch, APIG endpoints are added and the warmup
plugin has been added to serverless yml.

This branch can be deployed to a separate alias without destroying anything
that is deployed on master. Branch development in master and warmup can even
get more different over time.

### Deploying the system

Checkout the master branch and deploy the stage without specifying an alias (i.e.
the branch gets deployed into the master/stage alias `dev`).

```
git checkout master
serverless deploy
```

Checkout the warmup branch and deploy it to a different alias

```
git checkout warmup-apig
serverless deploy --alias=warmup
```

Afterwards you will have everything deployed in your AWS account. The functions
for the different aliases are labeled (aliased) with the alias name.
See the documentation of the alias plugin for details.



Attention: The project will create resources in your AWS account. These will
generate costs. You should delete the created resources (CF stacks) if you do
not need them anymore.
