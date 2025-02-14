console.log('script for remove cache after install new node modules')
const fs = require('node:fs');
fs.rmdir('../node_modules/.cache', err => {
	if (err) {
		throw err;
	}
	console.log(`${dir} is deleted!`);
});