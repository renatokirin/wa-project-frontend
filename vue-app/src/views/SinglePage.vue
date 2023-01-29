<script>
import Navbar from '../components/Navbar.vue';
import { store } from '../store.js';
import LikeButton from '../components/LikeButton.vue';
import BookmarkButton from '../components/BookmarkButton.vue';
import { formatDate } from '../utils/formatDate.js';

export default {
    components: {
        Navbar,
        LikeButton,
        BookmarkButton
    },
    data() {
        return {
            id: store.selectedPostId,
            post: {},
            formatDate
        }
    },
    methods: {
        async getPost() {
            console.log("get post activated")
            await fetch(`http://localhost:3000/api/posts/${this.id}`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.post = data;
            });
        },
        toUserPage(id) {
            store.setSelectedUserId(id);
            this.$router.push('/user');
        },
    },
    beforeMount() {
        this.getPost();
    }
};
</script>

<template>
    <div>
        <Navbar></Navbar>

        <div class="content w-50 ms-auto me-auto mt-4 mb-4 shadow-sm">
            <div class="card text-bg-light"
                style="border-bottom: none; border-bottom-right-radius: 0; border-bottom-left-radius: 0;">
                <div class="column p-2 px-3">
                    <div class="row">
                        <div>
                            <button type="button" class="btn btn-outline-dark p-0 px-0"
                                @click="toUserPage(post.author.id)" style="border: none; font-weight: bold;">
                                @{{ post.author.username }}
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="text-muted w-auto">{{ formatDate(post.createdAt) }}</div>
                        <span class="badge bg-primary w-auto">{{ post.topic.name }}</span>

                        <BookmarkButton v-if="post.userData" :id-prop="post._id"
                            :bookmarked-prop="post.userData.bookmarked" style="margin-left: auto; margin-right: 25px;">
                        </BookmarkButton>
                        <LikeButton style="margin-right: 15px;" v-if="post.userData" :id-prop="post._id"
                            :liked-prop="post.userData.liked" :likes-prop="post.likes"></LikeButton>
                        <i v-if="!post.userData"
                            class="fa-regular fa-heart w-auto fs-4 text-secondary ms-auto me-2 px-0"></i>
                        <div v-if="!post.userData" class="w-auto text-secondary">{{ post.likes }}</div>
                    </div>
                    <div class="row mt-4">
                        <p> {{ post.description }} </p>
                    </div>
                </div>
            </div>
            <div class="card px-3 pb-5 pt-3"
                style="border-top: none; border-top-right-radius: 0; border-top-left-radius: 0;">
                <h1>{{ post.title }}</h1>
                <p v-html="post.html"></p>
            </div>
        </div>

    </div>
</template> 