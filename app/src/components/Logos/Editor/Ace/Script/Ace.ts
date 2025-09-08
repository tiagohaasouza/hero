/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import ace from 'ace-builds';

// Preload Ace theme and mode files as URLs so Vite knows about them.
const THEME_URLS: Record<string, string> = import.meta.glob(
	'./ace-builds/src-noconflict/theme-*.js',
	{ as: 'url', eager: true },
);
const MODE_URLS: Record<string, string> = import.meta.glob('./ace-builds/src-noconflict/mode-*.js', {
	as: 'url',
	eager: true,
});

/**
 * Class representing the Ace editor configuration and management.
 */
export default class Ace {
	/**
	 * An array of commonly used font sizes.
	 *
	 * This array includes a range of font sizes that are typically used in UI design and document formatting.
	 * These sizes can be used to set font sizes in various elements to ensure consistency and readability.
	 *
	 * @type {number[]}
	 */
	static readonly FONT_SIZES: number[] = [
		8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 72, 96,
	];

	/**
	 * THEMES is an array of strings representing the names of various themes.
	 * These themes can be used in an application to change the visual appearance
	 * of the user interface.
	 */
	static readonly THEMES: string[] = [
		'chrome',
		'clouds',
		'crimson_editor',
		'dawn',
		'dreamweaver',
		'eclipse',
		'github_light_default',
		'github',
		'iplastic',
		'solarized_light',
		'textmate',
		'tomorrow',
		'xcode',
		'kuroir',
		'katzenmilch',
		'sqlserver',
		'cloud_editor',
		'ambiance',
		'chaos',
		'clouds_midnight',
		'dracula',
		'cobalt',
		'gruvbox',
		'gob',
		'idle_fingers',
		'kr_theme',
		'merbivore',
		'merbivore_soft',
		'mono_industrial',
		'monokai',
		'nord_dark',
		'one_dark',
		'pastel_on_dark',
		'solarized_dark',
		'terminal',
		'tomorrow_night',
		'tomorrow_night_blue',
		'tomorrow_night_bright',
		'tomorrow_night_eighties',
		'twilight',
		'vibrant_ink',
		'github_dark',
		'cloud_editor_dark',
	];

	/**
	 * An array of strings representing different programming languages and file formats.
	 * This array can be used to support syntax highlighting, linting, or other
	 * language-specific functionalities in applications such as code editors or IDEs.
	 *
	 * Each element in the array is a string identifier for a particular programming
	 * language or file format, such as 'javascript' for JavaScript or 'python' for Python.
	 */
	static readonly MODES: string[] = [
		'abap',
		'abc',
		'actionscript',
		'ada',
		'alda',
		'apache_conf',
		'apex',
		'aql',
		'asciidoc',
		'asl',
		'assembly_arm32',
		'assembly_x86',
		'astro',
		'autohotkey',
		'batchfile',
		'bibtex',
		'c_cpp',
		'c9search',
		'cirru',
		'clojure',
		'cobol',
		'coffee',
		'coldfusion',
		'crystal',
		'csharp',
		'csound_document',
		'csound_orchestra',
		'csound_score',
		'css',
		'curly',
		'cuttlefish',
		'd',
		'dart',
		'diff',
		'django',
		'dockerfile',
		'dot',
		'drools',
		'edifact',
		'eiffel',
		'ejs',
		'elixir',
		'elm',
		'erlang',
		'flix',
		'forth',
		'fortran',
		'fsharp',
		'fsl',
		'ftl',
		'gcode',
		'gherkin',
		'gitignore',
		'glsl',
		'gobstones',
		'golang',
		'graphqlschema',
		'groovy',
		'haml',
		'handlebars',
		'haskell',
		'haskell_cabal',
		'haxe',
		'hjson',
		'html',
		'html_elixir',
		'html_ruby',
		'ini',
		'io',
		'ion',
		'jack',
		'jade',
		'java',
		'javascript',
		'jexl',
		'json',
		'json5',
		'jsoniq',
		'jsp',
		'jssm',
		'jsx',
		'julia',
		'kotlin',
		'latex',
		'latte',
		'less',
		'liquid',
		'lisp',
		'livescript',
		'log',
		'logiql',
		'logtalk',
		'lsl',
		'lua',
		'luapage',
		'lucene',
		'makefile',
		'markdown',
		'mask',
		'matlab',
		'maze',
		'mediawiki',
		'mel',
		'mips',
		'mixal',
		'mushcode',
		'mysql',
		'nasal',
		'nginx',
		'nim',
		'nix',
		'nsis',
		'nunjucks',
		'objectivec',
		'ocaml',
		'odin',
		'partiql',
		'pascal',
		'perl',
		'pgsql',
		'php',
		'php_laravel_blade',
		'pig',
		'plsql',
		'powershell',
		'praat',
		'prisma',
		'prolog',
		'properties',
		'protobuf',
		'prql',
		'puppet',
		'python',
		'qml',
		'r',
		'raku',
		'razor',
		'rdoc',
		'red',
		'rhtml',
		'robot',
		'rst',
		'ruby',
		'rust',
		'sac',
		'sass',
		'scad',
		'scala',
		'scheme',
		'scrypt',
		'scss',
		'sh',
		'sjs',
		'slim',
		'smarty',
		'smithy',
		'snippets',
		'soy_template',
		'space',
		'sparql',
		'sql',
		'sqlserver',
		'stylus',
		'svg',
		'swift',
		'tcl',
		'terraform',
		'tex',
		'text',
		'textile',
		'toml',
		'tsx',
		'turtle',
		'twig',
		'typescript',
		'vala',
		'vbscript',
		'velocity',
		'verilog',
		'vhdl',
		'visualforce',
		'vue',
		'wollok',
		'xml',
		'xquery',
		'yaml',
		'zeek',
		'zig',
	];
	/**
	 * Represents the initialization state.
	 * This boolean flag indicates whether the system or component
	 * has completed its initialization process.
	 *
	 * Initially set to false, it can be set to true once the
	 * initialization sequence is successfully completed.
	 */
	static #isInitialized: boolean = false;
	/**
	 * An array that stores the names of the loaded themes.
	 * Each element in the array is a string representing a theme name.
	 * This array is initialized as empty and is populated as themes are loaded.
	 *
	 * @type {string[]}
	 */
	static #loadedThemes: string[] = [];
	/**
	 * An array that stores the modes loaded by the application. Each element
	 * in the array represents a mode as a string.
	 *
	 * This variable is used to keep track of all the modes that have been
	 * successfully loaded to ensure the application can manage and switch
	 * between them effectively.
	 *
	 * The array is initialized as empty and modes are added as strings when
	 * they are loaded.
	 *
	 * Example modes could include 'dark-mode', 'light-mode', etc.
	 */
	static #loadedModes: string[] = [];
	/**
	 * Creates a new instance of the class.
	 *
	 */
	public constructor() {}
	/**
	 * Initializes the Ace editor configuration.
	 * This method sets the base path for the Ace editor and ensures that it is only initialized once.
	 *
	 * @return {typeof Ace} The Ace class itself.
	 */
	static init(): typeof Ace {
		if (Ace.#isInitialized) return this;
		Ace.#isInitialized = true;
		ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict/');

		return this;
	}
	/**
	 * Loads the specified themes into the Ace editor.
	 *
	 * @param {string[]} themes - An array of theme names to be loaded.
	 * @return {typeof Ace} The Ace class with the specified themes loaded.
	 */
	static loadThemes(themes: string[]): typeof Ace {
		for (const theme of themes) {
			if (!Ace.#loadedThemes.includes(theme) && Ace.THEMES.includes(theme)) {
				const key = `./ace-builds/src-noconflict/theme-${theme}.js`;
				const themeUrl = THEME_URLS[key];
				if (themeUrl) {
					ace.config.setModuleUrl(`ace/theme/${theme}`, themeUrl);
					Ace.#loadedThemes.push(theme);
				}
			}
		}

		return this;
	}
	/**
	 * Loads the specified Ace editor modes if they are not already loaded.
	 *
	 * @param {string[]} modes - An array of mode names to be loaded.
	 * @return {typeof Ace} The Ace class with the newly loaded modes.
	 */
	static loadModes(modes: string[]): typeof Ace {
		for (const mode of modes) {
			if (!Ace.#loadedModes.includes(mode) && Ace.MODES.includes(mode)) {
				const key = `./ace-builds/src-noconflict/mode-${mode}.js`;
				const modeUrl = MODE_URLS[key];
				if (modeUrl) {
					ace.config.setModuleUrl(`ace/mode/${mode}`, modeUrl);
					Ace.#loadedModes.push(mode);
				}
			}
		}

		return this;
	}
}
