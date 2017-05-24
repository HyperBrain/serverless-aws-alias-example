/**
 * Test function 1
 */

import BbPromise from 'bluebird';

export class Test2 {

	static run(event) {
		return BbPromise.resolve(event);
	}

}
