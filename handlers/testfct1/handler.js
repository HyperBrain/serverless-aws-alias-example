'use strict';

import { Test1 } from '../../src/test1';

export function handle(event, context) {
	Test1.run(event).asCallback(context.done);
	return; // no Promise return as we invoke `context.done` directly!
}
