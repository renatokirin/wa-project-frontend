<script>
import '../assets/bootstrap.bundle';
import config from '../config.js';
export default {
    data() {
        return {
            margin: 'ms-auto',
            username: this.$cookies.get("username")
        }
    },
    methods: {
        async signOut() {
            await fetch(config.baseUrl + `/api/users/auth/signOut`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(() => window.location.reload());
        },

        removeMargin() {
            if (this.margin != 'ms-auto') this.margin = "ms-auto";
            else this.margin = '';
        }
    }
}
</script>
<template>
    <nav class="navbar navbar-light bg-light navbar-expand-lg px-4" style="top: 0; position: sticky; z-index: 99;">
        <router-link class="navbar-brand" to="/">Your blog</router-link>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            @click="removeMargin()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav w-100">
                <li class="navbar-item"  v-if="username" style="display: flex; align-items: center; justify-content: center;">
                    <router-link to="/bookmarks" style="text-decoration: none;">Bookmarks</router-link>
                </li>
                <div class="navbar-item" :class="margin" v-if="username">

                    <div class="dropdown">
                        <button class="btn btn-info text-light dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            @{{ username }}
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                            <li><router-link class="dropdown-item px-5" to="/my">My posts</router-link></li>
                            <li><a class="dropdown-item px-5" @click="signOut()">Sign out</a></li>
                        </ul>
                    </div>

                </div>

                <div class="navbar-item" :class="margin" v-if="!username">
                    <router-link class="btn btn-info text-light" type="button" to="/signin">
                        Sign In
                    </router-link>
                </div>

            </ul>
        </div>
    </nav>
</template>

<style scoped>
.btn-info:focus,
.btn-info:active {
    outline: none !important;
    box-shadow: none !important;
}
</style>