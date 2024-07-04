// esbuild.config.js

const esbuild = require('esbuild')
const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'

esbuild.build({
    entryPoints: [path.join(__dirname, 'app/javascript/application.js')],
    bundle: true,
    sourcemap: isDevelopment,
    minify: !isDevelopment,
    format: 'esm',
    outdir: path.join(__dirname, 'app/assets/builds'),
    publicPath: '/assets',
    watch: isDevelopment,
    loader: { '.js': 'jsx', '.css': 'css' },  // Added JSX loader here
}).catch(() => process.exit(1))
