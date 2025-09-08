<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';
import {
	VExpansionPanels,
	VExpansionPanel,
	VExpansionPanelText,
	VExpansionPanelTitle,
} from 'vuetify/components';

export default defineComponent({
	components: {
		VExpansionPanels,
		VExpansionPanel,
		VExpansionPanelText,
		VExpansionPanelTitle,
	},
	props: {},
	data() {
		return {
			libraries: [
				{
					name: 'Laravel WebAuthn',
					description:
						'Authenticate users with Passkeys: fingerprints, patterns and biometric data. This package provides an implementation of the WebAuthn API for Laravel, enabling passwordless authentication through biometrics and other secure methods.',
					type: 'security',
					command: 'php artisan webauthn:install && php artisan migrate',
					link: 'https://github.com/Laragear/WebAuthn',
				},
				/*{
					name: 'Laravel Two Factor',
					description: 'Add Two-Factor Authentication (2FA) to your Laravel application. This package supports multiple methods for 2FA including TOTP, QR codes, and recovery codes.',
					type: 'security',
					command: 'php artisan vendor:publish --provider="Laragear\\TwoFactor\\TwoFactorServiceProvider"',
					link: 'https://github.com/Laragear/TwoFactor'
				},*/
				{
					name: 'Laravel Google Calendar',
					description:
						'Manage events on a Google Calendar. This package makes working with a Google Calendar a breeze, allowing you to create, update, and delete events seamlessly.',
					type: 'calendar',
					command:
						'php artisan vendor:publish --provider="Spatie\\GoogleCalendar\\GoogleCalendarServiceProvider"',
					link: 'https://github.com/spatie/laravel-google-calendar',
				},
				{
					name: 'Laravel Updater',
					description:
						'This package is for updating your Laravel project via a view without needing any command in the prompt. It is useful when selling your project to multiple people as they can update it without any intervention from you.',
					type: 'gui',
					route: '/update',
					link: 'https://github.com/salahhusa9/laravel-updater',
				},
				{
					name: 'Eloquent Filter',
					description:
						'Eloquent Filter is a package to filter data of models by query strings. It allows creating complex filters for Eloquent models using a simple and intuitive syntax, making it easier to handle advanced search functionalities.',
					type: 'filtering',
					command: 'composer require mehdi-fathi/eloquent-filter',
					link: 'https://github.com/mehdi-fathi/eloquent-filter',
				},
				/*{
					name: 'Laravel FFMpeg',
					description: 'This package provides an integration with FFmpeg for Laravel. It handles the storage of files using Laravel\'s Filesystem and supports a variety of operations including video and audio conversions, progress monitoring, filters, and more.',
					type: 'media',
					command: 'composer require protonemedia/laravel-ffmpeg',
					link: 'https://github.com/protonemedia/laravel-ffmpeg'
				},*/
				{
					name: 'LaraDumps',
					description:
						'A friendly app designed to boost your Laravel PHP coding and debugging experience. It displays the result of your debug in a standalone Desktop application, providing tools like variable dumping, SQL query monitoring, and more.',
					type: 'debugging',
					command: 'composer require laradumps/laradumps --dev',
					link: 'https://github.com/laradumps/laradumps',
				},
				/*{
					name: 'Laravel SEO Scanner',
					description: 'Scan your Laravel application routes for SEO improvements suggestions. This package provides 24 checks for performance, configurations, use of meta tags, and content quality to help boost your SEO score.',
					type: 'seo',
					command: 'php artisan seo:scan',
					link: 'https://github.com/vormkracht10/laravel-seo-scanner'
				},*/
				{
					name: 'Laravel Console Menu',
					description:
						'Create beautiful PHP CLI menus using Laravel Artisan Console commands. This package is a wrapper for php-school/cli-menu, enabling easy creation of interactive menus in the command line.',
					type: 'cli',
					command: 'composer require nunomaduro/laravel-console-menu',
					link: 'https://github.com/nunomaduro/laravel-console-menu',
				},
				{
					name: 'Laravel Top',
					description:
						'Real-time monitoring from the command line for Laravel applications. It provides a lightweight solution for tracking essential metrics and identifying the busiest routes directly from the command line.',
					type: 'performance',
					command: 'php artisan top',
					link: 'https://github.com/leventcz/laravel-top',
				},
				/*{
					name: 'Laravel Slower',
					description: 'Optimize your DB queries with AI. This package identifies slow database queries and suggests optimal indexing strategies and other performance improvements.',
					type: 'performance',
					command: 'php artisan vendor:publish --tag="slower-config"',
					link: 'https://github.com/halilcosdu/laravel-slower'
				},*/
				{
					name: 'Laravel Queue Monitor',
					description:
						'A package to monitor Laravel jobs in your database. It allows you to handle failing jobs, monitor job progress, get estimated time remaining, store additional data, and retry jobs via the UI.',
					type: 'gui',
					route: '/jobs',
					link: 'https://github.com/romanzipp/Laravel-Queue-Monitor',
				},
				{
					name: 'Migrator',
					description:
						'A GUI migration manager for Laravel. Create, manage, and delete your migrations with ease. It includes a feature called "Safe Migrate" which automatically runs migrations in the correct order.',
					type: 'gui',
					route: '/migrator',
					link: 'https://github.com/reziamini/migrator',
				},
				{
					name: 'Laravel Totem',
					description:
						'Manage your Laravel Schedule from a web dashboard. Schedule your Laravel Console Commands and enable/disable scheduled tasks on the fly without going back to your code.',
					type: 'gui',
					route: '/totem',
					link: 'https://github.com/codestudiohq/laravel-totem',
				},
				{
					name: 'Laravel Scout Elasticsearch',
					description:
						'This package provides a seamless integration between Laravel Scout and Elasticsearch. It allows you to take advantage of all Laravel Scout’s features while leveraging Elasticsearch’s powerful search capabilities.',
					type: 'search',
					command: 'php artisan scout:import',
					link: 'https://github.com/matchish/laravel-scout-elasticsearch',
				},
				{
					name: 'Banhammer',
					description:
						'A Laravel package to ban any Model by ID, UUID, and by IP or Country. It allows blocking requests by IP addresses or countries, setting expiration dates for bans, and unbanning automatically using the scheduler.',
					type: 'security',
					command:
						'php artisan vendor:publish --provider="Mchev\\Banhammer\\BanhammerServiceProvider" --tag="config"',
					link: 'https://github.com/mchev/banhammer',
				},
				{
					name: 'Laravel Fulltext',
					description:
						'This package creates a MySQL fulltext index for models and enables you to search through those indexes. It provides a way to add fulltext search capabilities to your Laravel models easily.',
					type: 'search',
					command: 'php artisan vendor:publish --tag=laravel-fulltext && php artisan migrate',
					link: 'https://github.com/swisnl/laravel-fulltext',
				},
				{
					name: 'Laravel Lift',
					description:
						'Boost your Eloquent Models by creating public properties that match your table schema. This package leverages PHP 8 attributes and provides methods to easily manage and validate your models.',
					type: 'development',
					command: 'php artisan lift:migration',
					link: 'https://github.com/WendellAdriel/laravel-lift',
				},
				{
					name: 'Laravel Verify New Email',
					description:
						"This package adds support for verifying new email addresses. When a user updates its email address, it won't replace the old one until the new one is verified. It is easy to set up and fully customizable.",
					type: 'security',
					command:
						'php artisan vendor:publish --provider="ProtoneMedia\\LaravelVerifyNewEmail\\ServiceProvider"',
					link: 'https://github.com/protonemedia/laravel-verify-new-email',
				},
				{
					name: 'Laravel Chatbot',
					description:
						"Integrate OpenAI's powerful GPT models into your Laravel projects with this easy-to-use chatbot package. Enhances user engagement and automation, allowing you to create, manage, and interact with chat threads directly from your Laravel application.",
					type: 'bot-framework',
					command: 'php artisan vendor:publish --tag="chatbot-config"',
					link: 'https://github.com/halilcosdu/laravel-chatbot',
				},
				{
					name: 'BotMan',
					description:
						'A framework agnostic PHP library to build chat bots. BotMan is designed to simplify the task of developing innovative bots for multiple messaging platforms including Slack, Telegram, Microsoft Bot Framework, Nexmo, HipChat, Facebook Messenger, and WeChat.',
					type: 'bot-framework',
					command:
						'php artisan vendor:publish --tag=config --provider="BotMan\\BotMan\\BotManServiceProvider"',
					link: 'https://github.com/botman/botman',
				},
				{
					name: 'Log Viewer',
					description:
						'A fast and beautiful Log Viewer for Laravel. Helps you quickly and clearly see individual log entries, search, filter, and make sense of your Laravel logs.',
					type: 'gui',
					route: '/log-viewer',
					link: 'https://github.com/opcodesio/log-viewer',
				},
				{
					name: 'Laravel XSS Protection',
					description:
						'Laravel Middleware to protect your app against Cross-site scripting (XSS). It sanitizes request input by utilizing the Security Core package, and it can sanitize Blade echo statements as well.',
					type: 'security',
					command: 'php artisan vendor:publish --tag="xss-protection-config"',
					link: 'https://github.com/protonemedia/laravel-xss-protection',
				},
				{
					name: 'Laravel Server Monitor',
					description:
						'A Laravel package to periodically monitor the health of your server and application. It ships with common checks out of the box and allows you to add your own custom checks too. The package includes both console and web interfaces.',
					type: 'monitoring',
					command: 'php artisan servermonitor:check',
					link: 'https://github.com/sarfraznawaz2005/servermonitor',
				},
				{
					name: 'Laravel Schema Rules',
					description:
						'Automatically generate Laravel validation rules based on your database table schema. This package helps to create basic validation rules, which you can further fine-tune and optimize as needed.',
					type: 'validation',
					command: 'php artisan schema:generate-rules',
					link: 'https://github.com/laracraft-tech/laravel-schema-rules',
				},
				{
					name: 'Laravel Google Calendar',
					description:
						'Manage events on a Google Calendar. This package makes working with a Google Calendar a breeze, allowing you to create, update, and delete events seamlessly.',
					type: 'calendar',
					command:
						'php artisan vendor:publish --provider="Spatie\\GoogleCalendar\\GoogleCalendarServiceProvider"',
					link: 'https://github.com/spatie/laravel-google-calendar',
				},
				{
					name: 'Laravel Site Search',
					description:
						'Create a full-text search index by crawling your site. This package can crawl and index your entire site, using Meilisearch under the hood to provide blazing fast search speeds.',
					type: 'search',
					command: 'php artisan site-search:create-index',
					link: 'https://github.com/spatie/laravel-site-search',
				},
				{
					name: 'Meilisearch',
					description:
						'A lightning-fast search engine that fits effortlessly into your apps, websites, and workflow. Provides a delightful search experience with features such as typo tolerance, filters, and synonyms out of the box.',
					type: 'search',
					command: 'curl -L https://install.meilisearch.com | sh',
					link: 'https://github.com/meilisearch/meilisearch',
				},
				{
					name: 'Eloquent Power Joins',
					description:
						'The Laravel magic you know, now applied to joins. Allows joining nested relationships and applying conditions and callbacks directly to the joins.',
					type: 'database',
					command: "User::joinRelationship('posts.comments')",
					link: 'https://github.com/kirschbaum-development/eloquent-power-joins',
				},
				{
					name: 'Laravel IDE Helper',
					description:
						'Complete PHPDocs, directly from the source. This package generates helper files that enable your IDE to provide accurate autocompletion. Generation is done based on the files in your project, so they are always up-to-date.',
					type: 'development',
					command: 'php artisan ide-helper:generate',
					link: 'https://github.com/barryvdh/laravel-ide-helper',
				},
				{
					name: 'Laravel Prequel',
					description:
						'A package that provides a beautiful admin interface for your database management needs.',
					type: 'database',
					route: '/prequel',
					link: 'https://github.com/Protoqol/Prequel',
				},
				{
					name: 'Laravel Telescope',
					description: 'An elegant debug assistant for the Laravel framework.',
					type: 'debugging',
					route: '/telescope',
					link: 'https://github.com/laravel/telescope',
				},
				{
					name: 'Laravel Passport',
					description: 'OAuth2 server for your Laravel application.',
					type: 'security',
					link: 'https://github.com/laravel/passport',
				},
				{
					name: 'Laravel Socialite',
					description: 'OAuth authentication with social media services.',
					type: 'authentication',
					link: 'https://github.com/laravel/socialite',
				},
				{
					name: 'Spatie Laravel Permission',
					description: 'Associate users with roles and permissions.',
					type: 'authorization',
					link: 'https://github.com/spatie/laravel-permission',
				},
				{
					name: 'Spatie Laravel Activitylog',
					description: 'Log activity inside your Laravel app.',
					type: 'logging',
					command: 'php artisan activitylog:clean',
					link: 'https://github.com/spatie/laravel-activitylog',
				},
				{
					name: 'Laravel Excel',
					description: 'Supercharged Excel exports and imports in Laravel.',
					type: 'data-import-export',
					command: 'php artisan make:export',
					link: 'https://github.com/Maatwebsite/Laravel-Excel',
				},
				{
					name: 'Laravel Horizon',
					description: 'Monitor and configure your queues with a beautiful UI.',
					type: 'queues',
					route: '/horizon',
					link: 'https://github.com/laravel/horizon',
				},
				{
					name: 'Laravel Scout',
					description: 'Driver-based solution for adding full-text search to your Eloquent models.',
					type: 'search',
					command: 'php artisan scout:import',
					link: 'https://github.com/laravel/scout',
				},
				{
					name: 'Intervention Image',
					description:
						'Image handling and manipulation library with support for Laravel integration.',
					type: 'image-processing',
					command: 'php artisan image:cache',
					link: 'https://github.com/Intervention/image',
				},
				{
					name: 'Laravel Fortify',
					description: 'Backend authentication services for Laravel.',
					type: 'authentication',
					link: 'https://github.com/laravel/fortify',
				},
				{
					name: 'Laravel Sanctum',
					description: 'API token management for your Laravel application.',
					type: 'security',
					link: 'https://github.com/laravel/sanctum',
				},
				{
					name: 'Spatie Laravel Translatable',
					description: 'Making Eloquent models translatable.',
					type: 'localization',
					command: 'php artisan translatable:sync',
					link: 'https://github.com/spatie/laravel-translatable',
				},
				{
					name: 'Laravel Auditing',
					description: 'Audit for your Eloquent models.',
					type: 'auditing',
					command: 'php artisan audit:clean',
					link: 'https://github.com/owen-it/laravel-auditing',
				},
				{
					name: 'Laravel API Documentation Generator',
					description:
						'Automatically generate your API documentation from your Laravel application.',
					type: 'documentation',
					command: 'php artisan apidoc:generate',
					link: 'https://github.com/mpociot/laravel-apidoc-generator',
				},
				{
					name: 'Spatie Laravel Settings',
					description: 'Strongly typed settings for Laravel.',
					type: 'configuration',
					command: 'php artisan settings:clear',
					link: 'https://github.com/spatie/laravel-settings',
				},
				{
					name: 'Laravel Log Viewer',
					description: 'Log viewer for Laravel.',
					type: 'logging',
					route: '/log-viewer',
					link: 'https://github.com/rap2hpoutre/laravel-log-viewer',
				},
				{
					name: 'Laravel Nestedset',
					description: 'Efficient tree structures in relational databases.',
					type: 'database',
					command: 'php artisan nestedset:import',
					link: 'https://github.com/lazychaser/laravel-nestedset',
				},
				{
					name: 'Laravel User Verification',
					description: 'User email verification setup for Laravel.',
					type: 'security',
					link: 'https://github.com/jrean/laravel-user-verification',
				},
				{
					name: 'Laravel ImageUp',
					description: 'Image upload and management for Laravel.',
					type: 'image-processing',
					command: 'php artisan imageup:clear',
					link: 'https://github.com/qcod/laravel-imageup',
				},
				{
					name: 'Laravel MediaLibrary',
					description: 'Associate files with Eloquent models.',
					type: 'file-management',
					command: 'php artisan medialibrary:regenerate',
					link: 'https://github.com/spatie/laravel-medialibrary',
				},
				{
					name: 'Laravel DOMPDF',
					description: 'Generate PDFs from HTML in Laravel.',
					type: 'pdf-generation',
					command: 'php artisan dompdf:render',
					link: 'https://github.com/barryvdh/laravel-dompdf',
				},
				{
					name: 'Laravel Backup Manager',
					description: 'A database backup manager for Laravel.',
					type: 'database',
					command: 'php artisan db:backup',
					link: 'https://github.com/backup-manager/laravel',
				},
				{
					name: 'Laravel Doctrine',
					description: 'Doctrine ORM support for Laravel.',
					type: 'database',
					command: 'php artisan doctrine:schema:update',
					link: 'https://github.com/laravel-doctrine/orm',
				},
				{
					name: 'Laravel MongoDB',
					description: 'A MongoDB-based Eloquent model and Query builder for Laravel.',
					type: 'database',
					command: 'php artisan mongodb:setup',
					link: 'https://github.com/jenssegers/laravel-mongodb',
				},
				{
					name: 'Laravel Migrations Generator',
					description: 'Generate migrations from existing database structures.',
					type: 'database',
					command: 'php artisan migrate:generate',
					link: 'https://github.com/Xethron/migrations-generator',
				},
				{
					name: 'Algolia Search',
					description: 'Integrate Algolia search with Laravel Scout.',
					type: 'search',
					command: 'php artisan scout:import',
					link: 'https://github.com/algolia/algoliasearch-laravel',
				},
				{
					name: 'Elasticquent',
					description: 'Laravel Scout driver for Elasticsearch.',
					type: 'search',
					command: 'php artisan elasticquent:update',
					link: 'https://github.com/elasticquent/Elasticquent',
				},
			],
			backendURL: import.meta.env.VITE_BACKEND_URL,
		};
	},
	methods: {},
	computed: {
		groupedLibraries() {
			return this.libraries.reduce((groups, library) => {
				const { type } = library;
				if (!groups[type]) {
					groups[type] = [];
				}
				groups[type].push(library);
				return groups;
			}, {});
		},
	},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.title,
.card {
	margin-bottom: 20px;
}

.title {
	text-transform: capitalize;
}

.library-link {
	color: #1976d2;
	text-decoration: none;
}

.route-link {
	margin-left: 10px;
}
</style>

<template>
	<v-container>
		<h1 class="title">Total libraries: {{ libraries.length }}</h1>

		<div v-for="(libraries, type) in groupedLibraries" :key="type">
			<v-alert class="title" color="info" variant="tonal" border="start">{{ type }}</v-alert>

			<v-row>
				<v-col v-for="(library, index) in libraries" :key="index" cols="12" md="12" lg="12">
					<v-card class="card">
						<v-card-title>
							<a :href="library.link" target="_blank" class="library-link">{{ library.name }}</a>
							<a
								v-if="library.route"
								:href="backendURL + library.route"
								target="_blank"
								class="library-link route-link"
								><i class="mdi mdi-open-in-new"></i
							></a>
						</v-card-title>

						<v-card-text>
							<p>{{ library.description }}</p>
							<p v-if="library.type === 'utility'">
								<strong>Command:</strong> {{ library.command }}
							</p>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</v-container>
</template>
