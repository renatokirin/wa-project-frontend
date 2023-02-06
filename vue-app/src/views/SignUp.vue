<script>
import config from '../config.js';
export default {
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            signUpFailed: false,
            signUpFailedText: "Sign Up Error"
        }
    },
    methods: {
        async submitSignUp() {
            if (!(this.password == this.confirmPassword)) {
                this.signUpFailed = true;
                this.signUpFailedText = "Passwords do not match";
                return;
            }
            
            let json = { "username": username.value, "email": email.value, "password": password.value };
            await fetch(config.baseUrl + '/api/users/auth/signUp', {
                method: 'POST', credentials: 'include',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                if (data.error) this.signUpFailedText = data.error;
                if (data.alreadyExists) this.signUpFailedText = data.alreadyExists + " already exists";
                if (data.error || data.alreadyExists) this.signUpFailed = true;
                else this.$router.push('/signin');
            });

        }
    }
};
</script>

<template>
    <div class="content-container"
        style="width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div class="card shadow" style="width: 400px;">
            <div class="card-header">
                <h1>Your blog</h1>
            </div>
            <div class="card-body">
                <form style="display: flex; flex-direction: column;">
                    <div class="form-group mt-1">
                        <input type="text" class="form-control" id="username" placeholder="Username" v-model="username">
                    </div>
                    <div class="form-group mt-3">
                        <input type="email" class="form-control" id="email" placeholder="Email" v-model="email">
                    </div>
                    <div class="form-group mt-3">
                        <input type="password" class="form-control" id="password" placeholder="Password"
                            v-model="password">
                    </div>
                    <div class="form-group mt-3">
                        <input type="password" class="form-control" id="confirmpassword" placeholder="Confirm password"
                            v-model="confirmPassword">
                    </div>
                    <div class="alert alert-danger mt-4 py-1" role="alert" v-if="signUpFailed">
                        {{ signUpFailedText }}
                    </div>
                    <button v-on:click="submitSignUp()" type="button" class="btn btn-primary mt-4">Sign Up</button>
                    <div class="text-muted mt-5">
                        Have an account?
                        <a href="/signin">Sign In</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-container {
    background: repeating-radial-gradient(circle, transparent, transparent 16.8px, rgba(11, 92, 214, 0.09) 16.8px, rgba(11, 92, 214, 0.09) 21.6px), repeating-radial-gradient(circle, transparent, transparent 16.8px, rgba(11, 92, 214, 0.09) 16.8px, rgba(11, 92, 214, 0.09) 21.6px), #ffffff;
    background-size: 96px 96px;
    background-position: 0 0, 48px 48px, 96px 48px;
    background-color: #ffffff;
}
</style>