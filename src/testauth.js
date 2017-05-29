/**
 * Test function 1
 */

import BbPromise from 'bluebird';

const generatePolicy = function(principalId, effect, resource) {
	const authResponse = {};

	authResponse.principalId = principalId;
	if (effect && resource) {
		const policyDocument = {};
		policyDocument.Version = '2012-10-17'; // default version
		policyDocument.Statement = [];
		const statementOne = {};
		statementOne.Action = 'execute-api:Invoke'; // default action
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
	}

	// Can optionally return a context object of your choosing.
	authResponse.context = {};
	authResponse.context.stringKey = "stringval";
	authResponse.context.numberKey = 123;
	authResponse.context.booleanKey = true;
	return authResponse;
};

export class TestAuth {

	static run(event) {
		return BbPromise.resolve(generatePolicy('user', 'Allow', event.methodArn));
	}

}
