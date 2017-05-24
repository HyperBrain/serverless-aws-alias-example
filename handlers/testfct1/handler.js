'use strict';

import { Test1 } from '../../src/test1';

export function handle(event, context) {

	if (event.source === "serverless-plugin-warmup") {
		console.log("Warmup request."); // eslint-disable-line no-console
		return context.done(null, "Lambda is warm.");
	}
	
	Test1.run(event).asCallback(context.done);
	return; // no Promise return as we invoke `context.done` directly!
}
