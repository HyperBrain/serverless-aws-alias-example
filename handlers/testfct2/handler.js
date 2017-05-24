'use strict';

import { Test2 } from '../../src/test2';

export function handle(event, context) {
	Test2.run(event).asCallback(context.done);
	return; // no Promise return as we invoke `context.done` directly!
}
