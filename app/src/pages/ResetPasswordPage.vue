<script>
import { defineComponent } from 'vue';

import PageHeader from '@components/Hero/App/Layout/Page/PageHeader.vue';
import PageBody from '@components/Hero/App/Layout/Page/PageBody.vue';

export default defineComponent({
	components: { PageHeader, PageBody },
	data() {
		return {
			backgroundCounter: 14,
			valid: false,
			password: '',
			passwordRules: [(v) => !!v || 'Password is required'],
		};
	},
	methods: {
		onClick(e) {
			this.backgroundCounter = (this.backgroundCounter + 1) % 53;
			console.log('this.backgroundCounter', this.backgroundCounter);
		},
	},
	mounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<Page name="" :full="true" :go-to-top-button="false" :pull-to-refresh="false">
		<template #background>
			<Image
				:src="`/assets/backgrounds/nature/${backgroundCounter}.jpg`"
				width="100%"
				height="100vh"
				absolute
			/>
		</template>

		<PageBody>
			<v-container class="d-flex justify-center my-12" fluid>
				<v-col lg="5" cols="12" class="d-flex justify-center">
					<v-responsive max-width="420px" class="pa-4">
						<v-card class="glass-effect">
							<v-responsive max-width="60px" class="mx-auto mb-4">
								<v-img src="https://vuetifyjs.b-cdn.net/docs/images/logos/v.svg" contain></v-img>
							</v-responsive>
							<h1 class="text-h4 text-center font-weight-bold mb-2">
								{{ $t('authentication.resetPassword') }}
							</h1>
							<v-form>
								<v-text-field
									:label="$t('authentication.newPassword')"
									:placeholder="$t('authentication.newPassword')"
									type="password"
									outlined
									density="comfortable"
									append-inner-icon="mdi-eye"
								></v-text-field>
								<v-text-field
									:label="$t('authentication.confirmNewPassword')"
									:placeholder="$t('authentication.confirmNewPassword')"
									type="password"
									outlined
									density="comfortable"
									append-inner-icon="mdi-eye"
								></v-text-field>
								<v-btn class="bg-primary" block flat height="56px" elevated>{{
									$t('authentication.saveNewPassword')
								}}</v-btn>
							</v-form>
						</v-card>
					</v-responsive>
				</v-col>
			</v-container>
		</PageBody>
	</Page>
</template>
