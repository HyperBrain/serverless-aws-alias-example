'use strict';

import { TestAuth } from '../../src/testauth';

export function handle(event, context) {
	TestAuth.run(event).asCallback(context.done);
	return; // no Promise return as we invoke `context.done` directly!
}
