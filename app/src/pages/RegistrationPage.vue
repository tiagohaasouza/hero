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
								{{ $t('authentication.createAccount') }}
							</h1>
							<div class="text-h6 font-weight-regular text-center mb-8">
								{{ $t('authentication.signUpToGetStarted') }}
							</div>
							<v-form>
								<v-text-field
									:label="$t('authentication.email')"
									:placeholder="$t('authentication.email')"
									type="text"
									outlined
									density="comfortable"
								></v-text-field>
								<v-text-field
									:label="$t('authentication.password')"
									:placeholder="$t('authentication.password')"
									type="password"
									outlined
									density="comfortable"
									append-inner-icon="mdi-eye"
								></v-text-field>
								<v-text-field
									:label="$t('authentication.confirmPassword')"
									:placeholder="$t('authentication.confirmPassword')"
									type="password"
									outlined
									density="comfortable"
									append-inner-icon="mdi-eye"
								></v-text-field>
								<v-btn class="bg-primary" block flat height="56px" elevated>{{
									$t('authentication.signUp')
								}}</v-btn>
								<v-divider class="my-12">{{ $t('authentication.orContinueWith') }}</v-divider>
								<div class="d-flex align-center justify-center ga-4 mb-8">
									<v-btn
										icon
										class="v-btn--tonal"
										:style="{ color: '#d93f21', caretColor: '#d93f21' }"
									>
										<v-icon>mdi-google</v-icon>
									</v-btn>
									<v-btn
										icon
										class="v-btn--tonal"
										:style="{ color: '#1867c0', caretColor: '#1867c0' }"
									>
										<v-icon>mdi-facebook</v-icon>
									</v-btn>
									<v-btn icon class="v-btn--tonal">
										<v-icon>mdi-github</v-icon>
									</v-btn>
								</div>
								<div class="text-center">
									{{ $t('authentication.alreadyHaveAccount') }}
									<v-btn variant="text" class="text-primary" slim>{{
										$t('authentication.logIn')
									}}</v-btn>
								</div>
							</v-form>
						</v-card>
					</v-responsive>
				</v-col>
			</v-container>
		</PageBody>
	</Page>
</template>
