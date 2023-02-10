<script>
import config from '../config.js';
export default {
    data() {
        return {
            email: "",
            password: "",
            signInFailed: false,
        }
    },
    methods: {
        async submitSignIn() {
            let json = { "email": email.value, "password": password.value };

            await fetch(config.baseUrl + '/api/users/auth/signIn', {
                method: 'PATCH', credentials: 'include',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => {
                const cookies = res.headers.get('Set-Cookie');
                console.log("cookies ", cookies);
                this.$cookies.set("token", cookies.token);
                this.$cookies.set("email", cookies.email);
                this.$cookies.set("username", cookies.username);
                this.$cookies.set("id", cookies.id);
                return res.json();
            }).then(data => {
                console.log(data);
                if (!data.authenticated) this.signInFailed = true;
                else this.$router.push('/');
            });
        }
    }
};
</script>

<template>
    <div class="content-container"
        style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div class="card shadow" style="width: 400px;">
            <div class="card-header">
                <h1>Your blog</h1>
            </div>
            <div class="card-body">
                <form style="display: flex; flex-direction: column;">
                    <div class="form-group mt-1">
                        <input type="email" class="form-control" id="email" placeholder="Email" v-model="email">
                    </div>
                    <div class="form-group mt-3">
                        <input type="password" class="form-control" id="password" placeholder="Password"
                            v-model="password">
                    </div>
                    <div class="alert alert-danger mt-4 py-1" role="alert" v-if="signInFailed">
                        Incorrect email or password
                    </div>
                    <button type="button" class="btn btn-primary mt-4" v-on:click="submitSignIn()">Sign In</button>
                    <div class="text-muted mt-5">
                        Don't have an account?
                        <router-link to="/signup">Sign up</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template> 

<style scoped>
.content-container {
    background-image: radial-gradient(rgba(11, 92, 214, 0.32) 2px, transparent 2px);
    background-size: 29px 29px;
    background-color: white;
}
</style>