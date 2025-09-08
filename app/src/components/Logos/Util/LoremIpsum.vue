<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'LoremIpsum',
	props: {
		min: {
			type: [String, Number],
			default: 1,
		},
		max: {
			type: [String, Number],
			default: 5,
		},
		type: {
			type: String,
			default: 'paragraphs', // Could be 'paragraphs', 'sentences', or 'words'
			validator: (value: string) => ['paragraphs', 'sentences', 'words'].includes(value),
		},
		prefix: {
			type: String,
			default: '<p>',
		},
		suffix: {
			type: String,
			default: '</p>',
		},
	},
	data() {
		return {
			content: '',
		};
	},
	methods: {
		generateLoremIpsum() {
			const paragraphs = [
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in est iaculis, molestie orci non, dignissim sapien. Fusce elementum cursus mi at ullamcorper. Sed ut justo ut diam tristique lacinia id eu arcu. Etiam tincidunt enim a molestie maximus. Sed ac quam vitae ipsum cursus ultrices nec sit amet nulla. Mauris vitae condimentum velit. Phasellus cursus tempor augue non viverra. Quisque ex velit, lobortis sit amet elit vitae, suscipit dictum nunc. Maecenas sit amet magna scelerisque, consectetur felis vel, scelerisque ex. Maecenas quis suscipit leo, vitae dapibus tellus.`,

				` Fusce accumsan, ipsum ut mattis mattis, risus nisi euismod orci, in rhoncus mi odio at lacus. Maecenas sit amet lectus laoreet, mattis massa quis, dignissim magna. Aliquam pulvinar leo sit amet nisl tempus posuere. Nam ultricies eget augue ac sodales. Sed quis aliquet quam. Aliquam a justo id dui vulputate malesuada nec id lectus. In tincidunt pretium gravida. Maecenas placerat tincidunt odio quis vestibulum. Aliquam scelerisque vulputate ultrices.`,

				`Suspendisse elementum, urna sed venenatis egestas, odio nulla pretium ipsum, eu mollis libero ante maximus dui. Suspendisse sed commodo magna. In suscipit ac ex at malesuada. Mauris eget aliquet nisl. Etiam placerat ligula a nulla euismod malesuada. Morbi pellentesque arcu vitae pharetra tincidunt. Cras quis augue orci. Donec luctus massa sit amet dolor pulvinar, vel convallis libero luctus. Proin imperdiet dui nec dictum aliquet. Donec ac aliquet sapien, ac scelerisque leo. Phasellus tempus quam ac aliquam ultricies. Maecenas convallis tellus eu nisl sodales finibus. Fusce finibus tempor urna. Vestibulum lacus neque, hendrerit sed metus sed, convallis malesuada tellus. Morbi tellus lectus, tristique non sapien ac, molestie convallis nibh.`,

				`Donec ut orci eros. Pellentesque malesuada ac neque nec sollicitudin. Etiam sed suscipit enim. Maecenas suscipit pretium dignissim. Aliquam a velit id sapien tempor fringilla vel at mi. Nullam imperdiet turpis ut orci finibus, id aliquam quam ultrices. Maecenas convallis eget leo nec porttitor.`,

				`Nam velit enim, finibus mollis enim sit amet, feugiat tristique magna. Duis egestas ipsum eu ultrices aliquet. Proin cursus massa in orci tempor, eget fermentum neque pretium. Nunc sagittis scelerisque nunc, a viverra nisl ultrices in. Maecenas facilisis, eros eget consectetur euismod, tortor augue tempus justo, id commodo metus mi ut sem. Nullam id est eleifend, lacinia massa sit amet, tincidunt tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id maximus libero, quis placerat elit. Ut rhoncus ullamcorper erat, non congue nulla. Curabitur sagittis, orci in accumsan dignissim, orci sapien imperdiet turpis, sed porttitor enim tortor pulvinar magna. Fusce in elit id nibh dignissim semper at ac lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam at lorem at enim consequat varius nec sit amet nunc.`,

				`Etiam elit lorem, iaculis ac finibus eu, interdum eu mauris. Nulla facilisi. Sed turpis eros, varius auctor sem in, sodales vulputate enim. Proin orci orci, cursus sit amet fringilla id, fermentum eu erat. Curabitur tempor purus id feugiat ullamcorper. Aenean aliquam elementum sapien eu semper. Vivamus consequat mi nibh, id vestibulum diam egestas at. Etiam placerat a nisl euismod dapibus. Vestibulum nec facilisis elit, sed volutpat ex. Quisque malesuada nibh ac tellus euismod, id cursus neque pretium. Pellentesque lobortis interdum turpis. Aenean semper eros in lectus aliquam, eget blandit mauris dignissim. Nulla pretium, nisl placerat elementum volutpat, arcu neque pulvinar purus, in lobortis augue lacus quis arcu.`,

				`Sed sit amet nisi dolor. Duis vel enim aliquet quam vehicula aliquet vestibulum vel tortor. Nam orci sapien, suscipit sit amet dignissim ut, volutpat vel lorem. Integer quis tincidunt orci. Maecenas nisi nisl, imperdiet eu mollis semper, fermentum sed augue. Curabitur lacinia augue lorem, vitae cursus mauris porta id. Proin eleifend diam diam, non dictum sem convallis vel. Vestibulum dui tortor, interdum quis porttitor at, dignissim faucibus justo. Vestibulum lobortis faucibus iaculis. Nulla quis imperdiet ex.`,

				`Quisque ligula ipsum, faucibus a porta sit amet, commodo nec mi. Aliquam quis velit vestibulum, facilisis ante sed, interdum dui. Maecenas nec sagittis tellus, cursus ullamcorper metus. Fusce sed faucibus lectus. Donec sit amet sem erat. Praesent ligula urna, congue nec libero in, volutpat dictum metus. Phasellus pretium tortor augue. Cras tempor eu felis in fringilla. Sed convallis, lorem ac dignissim hendrerit, justo est feugiat justo, sit amet congue elit est eu velit. Curabitur mi ex, ultrices sit amet faucibus eu, porttitor nec lacus. Fusce dapibus ipsum sit amet accumsan lobortis. Aenean luctus lectus nisi, non congue lacus elementum sit amet.`,

				`In tortor diam, pellentesque sit amet felis vitae, iaculis mollis orci. In hac habitasse platea dictumst. Nulla scelerisque nisi vel vestibulum lobortis. Sed consectetur pharetra nibh et eleifend. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis ac consequat lorem. Curabitur tristique at risus et consectetur. Aenean semper vitae dui eu cursus. Integer aliquet orci dui, non commodo diam fermentum at. Nulla fermentum tincidunt maximus. Nam vestibulum maximus libero, in dictum sapien pellentesque vitae. Aliquam nec mollis nulla. Phasellus ante nunc, tincidunt placerat ex vitae, dapibus sollicitudin lacus.`,

				`Nullam accumsan diam nisi, non suscipit purus fringilla id. Donec fermentum lacus et lacus rutrum imperdiet. Integer dolor odio, bibendum sit amet elit id, aliquam sollicitudin lectus. Nam finibus urna nec nisl fermentum pulvinar. Donec dictum erat eget sapien euismod, ut finibus ex auctor. Donec sodales in nisl id egestas. Suspendisse cursus est ante, eu finibus erat facilisis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a erat pulvinar leo lobortis maximus. Suspendisse nisi mi, luctus eget neque sed, tincidunt euismod eros. Duis ac placerat massa. Morbi arcu diam, faucibus a lectus et, consectetur suscipit ipsum. Pellentesque mollis elit ac nisi ornare, eget dignissim est ullamcorper.`,
			];

			const sentences = [
				'Lorem ipsum dolor sit amet.',
				'Consectetur adipiscing elit.',
				'Sed do eiusmod tempor incididunt.',
				'Ut labore et dolore magna aliqua.',
				'Ut enim ad minim veniam.',
				'Quis nostrud exercitation ullamco laboris.',
				'Nisi ut aliquip ex ea commodo consequat.',
				'Duis aute irure dolor in reprehenderit.',
				'In voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
				'Excepteur sint occaecat cupidatat non proident.',
			];

			const words = [
				'Lorem',
				'ipsum',
				'dolor',
				'sit',
				'amet',
				'consectetur',
				'adipiscing',
				'elit',
				'sed',
				'do',
				'eiusmod',
				'tempor',
				'incididunt',
				'ut',
				'labore',
				'et',
				'dolore',
				'magna',
				'aliqua',
				'Ut',
				'enim',
				'ad',
				'minim',
				'veniam',
				'quis',
				'nostrud',
				'exercitation',
				'ullamco',
				'laboris',
				'nisi',
				'ut',
				'aliquip',
				'ex',
				'ea',
				'commodo',
				'consequat',
				'Duis',
				'aute',
				'irure',
				'dolor',
				'in',
				'reprehenderit',
				'in',
				'voluptate',
				'velit',
				'esse',
				'cillum',
				'dolore',
				'eu',
				'fugiat',
				'nulla',
				'pariatur',
				'Excepteur',
				'sint',
				'occaecat',
				'cupidatat',
				'non',
				'proident',
				'sunt',
				'in',
				'culpa',
				'qui',
				'officia',
				'deserunt',
				'mollit',
				'anim',
				'id',
				'est',
				'laborum',
			];

			const count =
				Math.floor(Math.random() * (Number(this.max) - Number(this.min) + 1)) + Number(this.min);
			let contentArray: string[] = [];

			if (this.type === 'paragraphs') {
				contentArray = Array.from(
					{ length: count },
					() =>
						this.prefix + paragraphs[Math.floor(Math.random() * paragraphs.length)] + this.suffix,
				);
			} else if (this.type === 'sentences') {
				contentArray = Array.from(
					{ length: count },
					() => this.prefix + sentences[Math.floor(Math.random() * sentences.length)] + this.suffix,
				);
			} else {
				contentArray = Array.from(
					{ length: count },
					() => this.prefix + words[Math.floor(Math.random() * words.length)] + this.suffix,
				);
			}

			this.content = contentArray.join(' ');
		},
	},
	created() {
		this.generateLoremIpsum();
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<div v-html="content"></div>
</template>
