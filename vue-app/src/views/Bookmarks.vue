<script>
import Navbar from '../components/Navbar.vue';
import { formatDate } from '../utils/formatDate';
import LikeButton from '../components/LikeButton.vue';
import BookmarkButton from '../components/BookmarkButton.vue';
import { store } from '../store.js';
import config from '../config.js';

export default {
    components: {
        Navbar,
        BookmarkButton,
        LikeButton
    },
    data() {
        return {
            posts: [],
            formatDate,
            isLoading: false
        }
    },
    methods: {
        async getBookmarks() {
            this.isLoading = true;
            await fetch(config.baseUrl + `/api/users/bookmarks`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.isLoading = false;
                this.posts = data;
            });
        },

        toPostPage(id) {
            store.setSelectedPostId(id);
            this.$router.push('/post');
        },

        toUserPage(id) {
            store.setSelectedUserId(id);
            this.$router.push('/user');
        },
    },
    beforeMount() {
        this.getBookmarks();
    }
};
</script>

<template>
    <div>
        <Navbar></Navbar>

        <div class="wrapper">
            <div class="posts-container pt-4 p-4">
                <h3 class="mb-4">Your bookmarks</h3>

                <div class="lds-ring" style="margin-left: 45%; margin-right: 55%;" v-if="isLoading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div class="card post mb-3 shadow-sm" v-for="post in posts">
                    <div class="card-header" style="display: flex;">
                        <button type="button" class="btn btn-outline-dark p-0 px-1" @click="toUserPage(post.author.id)"
                            style="border: none; font-weight: bold;">
                            @{{ post.author.username }}
                        </button>
                        <BookmarkButton v-if="post.userData" :id-prop="post._id"
                            :bookmarked-prop="post.userData.bookmarked" style="margin-left: auto; margin-right: 25px;">
                        </BookmarkButton>
                        <LikeButton style="margin-right: 15px;" v-if="post.userData" :id-prop="post._id"
                            :liked-prop="post.userData.liked" :likes-prop="post.likes"></LikeButton>
                        <i v-if="!post.userData"
                            class="fa-regular fa-heart w-auto fs-4 text-secondary ms-auto me-2 px-0"></i>
                        <div v-if="!post.userData" class="w-auto text-secondary">{{ post.likes }}</div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title fw-bold" @click="toPostPage(post._id)">{{ post.title }}</h5>
                        <p class="card-text">
                            {{ post.description }}
                        </p>
                        <div class="row">
                            <div class="text-muted w-auto">{{ formatDate(post.createdAt) }}</div>
                            <span class="badge bg-primary w-auto" style="height: 25px;">{{ post.topic.name }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="(posts.length == 0) && isLoading == false"
                    style="display: flex; align-items: center; gap: 15px;">
                    <h4 class="text-secondary">
                        No bookmarked posts available, bookmark a post by clicking a <i
                            class="fa-regular fa-bookmark fs-4 text-dark"></i> bookmark button.
                    </h4>
                </div>

            </div>
        </div>

    </div>
</template> 

<style scoped>
@import '../assets/style.css';
</style>

