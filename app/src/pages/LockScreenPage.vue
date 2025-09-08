<script>
import { defineComponent } from 'vue';

import PageHeader from '@components/Hero/App/Layout/Page/PageHeader.vue';
import PageBody from '@components/Hero/App/Layout/Page/PageBody.vue';

export default defineComponent({
	components: { PageHeader, PageBody },
	data() {
		return {
			valid: false,
			password: '',
			passwordRules: [(v) => !!v || 'Password is required'],
		};
	},
	methods: {
		unlockScreen() {
			if (this.password === 'your_password') {
				alert('Screen Unlocked!');
				// Implementar lógica para desbloquear a tela
			} else {
				alert('Invalid Password');
			}
		},
		async useBiometric() {
			try {
				const publicKeyCredentialRequestOptions = {
					challenge: new Uint8Array([
						// um desafio fornecido pelo servidor
						0x8c, 0x02, 0x13, 0x18, 0x9d, 0x2a, 0x29, 0x2e, 0x30, 0x3d, 0x40, 0x44, 0x45, 0x50,
						0x5c, 0x63, 0x6f, 0x70, 0x74, 0x7e, 0x82, 0x8f, 0x9b, 0xa5, 0xa9, 0xae, 0xb4, 0xb5,
						0xc2, 0xcf, 0xd0, 0xe0,
					]).buffer,
					allowCredentials: [], // uma lista de credenciais permitidas fornecida pelo servidor
					userVerification: 'preferred',
				};

				const credential = await navigator.credentials.get({
					publicKey: publicKeyCredentialRequestOptions,
				});

				// Enviar o `credential` para o servidor para validação
				// const result = await axios.post('/api/validate-credential', credential);

				// Para demonstração, assumiremos que a validação foi bem-sucedida
				const result = true;

				if (result) {
					alert('Screen Unlocked with Biometric!');
					// Implementar lógica para desbloquear a tela
				}
			} catch (error) {
				alert('Biometric Authentication Failed');
			}
		},
	},
	mounted() {
		// Qualquer lógica necessária após montar o componente
	},
});
</script>

<style scoped lang="less">
.login-card {
	max-width: 400px;
	min-height: 420px;
	background: rgba(255, 255, 255, 0.9);
	padding: 32px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	text-align: center;
}
</style>

<template>
	<Page name="" :full="true">
		<template #background>
			<Image src="/assets/backgrounds/nature/7.jpg" width="100%" height="100vh" absolute />
		</template>

		<PageBody>
			<v-container class="d-flex justify-center my-12" fluid>
				<v-col lg="5" cols="12" class="d-flex justify-center">
					<v-responsive max-width="420px" class="pa-4">
						<v-card class="glass-effect">
							<v-responsive max-width="60px" class="mx-auto mb-4">
								<v-img src="https://vuetifyjs.b-cdn.net/docs/images/logos/v.svg" contain></v-img>
							</v-responsive>
							<h1 class="text-h4 text-center font-weight-bold mb-2">Welcome back!</h1>
							<div class="text-h6 font-weight-regular text-center mb-8">Log into your account</div>
							<v-form>
								<v-text-field
									label="Email"
									placeholder="Email"
									type="text"
									outlined
									density="comfortable"
								></v-text-field>
								<v-text-field
									label="Password"
									placeholder="Password"
									type="password"
									outlined
									density="comfortable"
									append-inner-icon="mdi-eye"
								></v-text-field>
								<div class="text-end">
									<v-btn variant="text" class="text-primary" slim>Forgot password?</v-btn>
								</div>
								<v-btn class="bg-primary" block flat height="56px" elevated>Log In</v-btn>
								<v-divider class="my-12">Or continue with</v-divider>
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
									Don't have an account?
									<v-btn variant="text" class="text-primary" slim>Sign up</v-btn>
								</div>
							</v-form>
						</v-card>
					</v-responsive>
				</v-col>
			</v-container>

			<!--
			<v-container class="lock-screen-container">
				<v-row class="d-flex align-center justify-center">
					<v-col cols="12" sm="8" md="4" class="text-center">
						<v-card class="login-card">
							<v-card-title>Locked Screen</v-card-title>
							<v-card-text>
								<v-form v-model="valid" ref="form" style="min-width: 300px">
									<v-text-field
										v-model="password"
										:rules="passwordRules"
										label="Enter Password"
										type="password"
										required
									></v-text-field>
									<v-btn :disabled="!valid" @click="unlockScreen" class="my-4">Unlock</v-btn>
									<v-btn @click="useBiometric">Unlock with Fingerprint</v-btn>
								</v-form>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
			-->
		</PageBody>
	</Page>
</template>
