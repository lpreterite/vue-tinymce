import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'

import pkg from './package.json'

const name = "VueTinymce"
const sourcemap = true
pkg.browser = "dist/vue-tinymce.umd.js"

const plugins = []
if(process.env.BUILD === 'production'){
	plugins.push(terser({ sourcemap }))
}

export default [
	{
		input: 'src/main.js',
		output: [
            { name, file: pkg.browser, format: 'umd', exports: 'named', sourcemap },
			{ name, file: pkg.main, format: 'cjs', exports: 'named', sourcemap },
			{ name, file: pkg.module, format: 'es', exports: 'named', sourcemap },
		],
        plugins: [
			resolve(),
			commonjs(),
			
			css(),
			vue({ css: false }),
			
			...plugins
        ]
	},
	{
		input: "docs/main.js",
		output: [
			{
				name:"bundle",
				file:"docs/assets/bundle.js",
				format: "umd",
				exports: "named",
				sourcemap,
				globals:{
					Vue:"vue",
					tinymce: "tinymce"
				}
			}
		],
		external: ['vue', 'tinymce'],
        plugins: [
			resolve(),
			commonjs(),
		]
	}
]