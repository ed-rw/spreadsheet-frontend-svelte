

const node = require('@sveltejs/adapter-node');

module.exports = {
	kit: {
		adapter: node(),
		target: '#svelte',
		vite: {
            ssr: {
    				noExternal: ['node-fetch']
    			}
            }
	}
};
