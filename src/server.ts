import sirv from 'sirv';
import polka from 'polka';
import { createProxyMiddleware } from 'http-proxy-middleware';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, API_DOMAIN } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		// NOTE: middleware added here is global and runs first in polka
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			ignore: 'api'
		})
	)
	// Proxy requests to '/api' base domain to the backend
	.use('/api', createProxyMiddleware({
		changeOrigin: true,
		logLevel: 'debug',
		target: API_DOMAIN,
		pathRewrite: {
			'^/api': ''
		}
	}),)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
