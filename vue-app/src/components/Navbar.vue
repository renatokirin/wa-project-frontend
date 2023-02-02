<script>
import '../assets/bootstrap.bundle';

export default {
    data() {
        return {
            margin: 'ms-auto',
            username: this.$cookies.get("username")
        }
    },
    methods: {
        async signOut() {
            await fetch(`http://localhost:3000/api/users/auth/signOut`, {
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
        <a href="/" class="navbar-brand">Your blog</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            @click="removeMargin()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav w-100">
                <li class="navbar-item"  v-if="username">
                    <a href="/bookmarks" class="nav-link">Bookmarks</a>
                </li>
                <div class="navbar-item" :class="margin" v-if="username">

                    <div class="dropdown">
                        <button class="btn btn-info text-light dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            @{{ username }}
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item px-5" href="/my">My posts</a></li>
                            <li><a class="dropdown-item px-5" @click="signOut()">Sign out</a></li>
                        </ul>
                    </div>

                </div>

                <div class="navbar-item" :class="margin" v-if="!username">
                    <a class="btn btn-info text-light" type="button" href="/signin">
                        Sign In
                    </a>
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