import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'charts.ts',
	output: {
		file: 'dist/charts_bundle.js',
		 // immediately-invoked function expression — suitable for <script> tags
		sourcemap: false
	},
	plugins: [
        commonjs(),
    resolve(),
	typescript() 
	]
};