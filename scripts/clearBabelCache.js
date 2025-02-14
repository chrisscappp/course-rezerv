console.log('Script for remove cache after install new node module...')

const fs = require('node:fs');
const path = require('path')
const removeBabelCachePath = path.resolve(__dirname, "../", "node_modules", ".cache", "babel-loader")

fs.rmdir(removeBabelCachePath, { recursive: true, force: true }, err => {
	if (err) throw err
	console.log(`${removeBabelCachePath} is deleted!`)
})