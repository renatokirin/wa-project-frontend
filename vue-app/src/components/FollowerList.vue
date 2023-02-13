<script>
import { store } from '../store.js';

export default {
    props: {
        users: Array,
        textProp: String,
        valueProp: Number
    },
    data() {
        return {
            selected: store.selectedUserId,
            dropdown: "",
            noUsers: false
        }
    },
    methods: {
        showList() {
            if (this.dropdown == "") this.dropdown = "show"
            else this.dropdown = "";
        },
        toUserPage(id) {
            store.setSelectedUserId(id);
            window.location.reload();
            if (this.$router.currentRoute.path == '/my') {
                setTimeout(() => {
                    this.$router.push('/user');
                }, 250);
            }
        },
    }
};

</script>

<template>
    <div class="dropdown-center user-info followers-btn" @click="showList()">
        <div>{{ textProp }}</div>
        <div>{{ valueProp }}</div>
        <ul class="dropdown-menu" :class="dropdown" aria-labelledby="dropdownMenuButton1"
            style="width: 300px; max-height: 220px; overflow: scroll; margin-top: 50px;">
            <button style="border: none; border-radius: 0; width: 100%; display: flex; align-items: center;"
                class="btn btn-outline-primary" v-for="user in users" @click="toUserPage(user._id)">
                <img v-if="!user.profilePicture" src="../assets/defaultprofilepic.png"
                    style="width: 50px; height: 50px; border-radius: 100vh;" />
                <img v-if="user.profilePicture" :src="user.profilePicture"
                    style="width: 50px; height: 50px; border-radius: 100vh;" />
                <div style="margin-left: auto; margin-right: auto;">@{{ user.username }}</div>
            </button>

        </ul>
    </div>

</template> 
