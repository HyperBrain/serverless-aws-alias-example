/**
 * Test function 1
 */

import BbPromise from 'bluebird';

export class Test1 {

	static run(event) {
		return BbPromise.resolve(event);
	}

}
