/**
 * Test function 1
 */

import BbPromise from 'bluebird';

export class Test2 {

	static run(event) {
		return BbPromise.resolve({ statusCode: 200, headers: {
			'Content-Type': 'application/json'
		}, body: JSON.stringify(event) });
	}

}
