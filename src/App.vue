<template>
	<v-app>
		<div class="my-app">
			<v-app-bar v-if="signedIn" app color="primary" dark flat>
				<v-btn @click="homeClick" text class="mr-2">
					<v-icon left>fas fa-home</v-icon>
					<span class="mr-2">Home</span>
				</v-btn>

				<div class="d-flex align-center">
					<h3>{{ header_text }}</h3>
				</div>

				<v-spacer></v-spacer>

				<v-btn @click="logoutClick" text>
					<span class="mr-2">Logout</span>
					<v-icon>fas fa-sign-out-alt</v-icon>
				</v-btn>

			</v-app-bar>
			<v-content class="page-content">
				<router-view></router-view>
			</v-content>
		</div>
		<Dialog />
	</v-app>
</template>

<script>
import Dialog from './components/Dialog';
import { mapState } from 'vuex';
import Session from './services/session';
export default {
	name: "App",
	components: {
		Dialog
	},
	computed: {
		...mapState({
			signedIn: state => state.session.signedIn,
			user: state => state.session.user,
		}),
		header_text(){
			return (this.user && this.user.infos && this.user.infos.name) || 'Rxa Client Area'
		}
	},
	methods: {
		homeClick(){
			this.$router.push('/')
		},
		logoutClick(){
			Session.logout();
		}
	}
};
</script>

<style lang="scss" scoped>
.my-app{
	position: fixed;
	display: grid;
	width: 100%;
	grid-template-columns: 100%;
	&.splited{
		grid-template-columns: 256px auto;
	}
	.right-size{
		position: relative;
	}
	.my-drawer{
		position: relative;
		z-index: 1000;
		border-radius: 0 !important;
	}
}
.page-content{
	padding: 80px 20px 20px 20px !important;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: scroll;
}
</style>

<style lang="scss">
html{
	overflow: hidden;
}
</style>