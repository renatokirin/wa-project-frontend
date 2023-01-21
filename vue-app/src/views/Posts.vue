<script>
import Navbar from '../components/Navbar.vue';
import SearchTopics from '../components/SearchTopics.vue';
import BookmarkButton from '../components/BookmarkButton.vue';
import LikeButton from '../components/LikeButton.vue';
import Pagination from '../components/Pagination.vue';
import { store } from '../store.js';

export default {
    components: {
        Navbar,
        SearchTopics,
        BookmarkButton,
        LikeButton,
        Pagination
    },
    data() {
        return {
            posts: [],
            currentPage: 1,
            totalPages: 10,
            topicName: ""
        }
    },
    methods: {
        async getPosts() {
            await fetch(`http://localhost:3000/api/posts?page=${this.currentPage}&limit=${10}&topic=${this.topicName}`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.posts = data.posts;
                this.totalPages = data.totalPages;
            });
        },

        onPageChange(page) {
            this.currentPage = page;
            this.getPosts();
        },

        searchByTopic(string) {
            this.topicName = string;
            this.getPosts();
        },

        toPostPage(id) {
            store.setSelectedPostId(id);
            this.$router.push('/post');
        },

        toUserPage(id) {
            store.setSelectedUserId(id);
            this.$router.push('/user');
        },

        formatDate(value) {
            let d = new Date(value);
            if (value) return d.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
        },
    },

    beforeMount() {
        this.getPosts();
    }
};

</script>

<template>
    <div class="posts-page-container">
        <Navbar></Navbar>
        <div class="wrapper">
            <div class="left-content p-2 pt-4 fixed-top"
                style="margin-top: 60px; width: 18vw; margin-left: 20px; z-index: 0;">
                <a href="/createpost">
                    <button class="btn btn-outline-primary w-100" style="font-weight: bold;">
                        <i class="fa-solid fa-pen"></i> New Post
                    </button>
                </a>
            </div>
            <div class="posts-container pt-4 p-4">
                <div class="card post mb-3 shadow-sm" v-for="post in posts">
                    <div class="card-header" style="display: flex;">
                        <button type="button" class="btn btn-outline-dark p-0 px-1" @click="toUserPage(post.userId)"
                            style="border: none; font-weight: bold;">
                            {{ post.author.username }}
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
                    <div class="card-body" @click="toPostPage(post._id)">
                        <h5 class="card-title fw-bold">{{ post.title }}</h5>
                        <p class="card-text">
                            {{ post.description }}
                        </p>
                        <div class="row">
                            <div class="text-muted w-auto">{{ formatDate(post.createdAt) }}</div>
                            <span class="badge bg-primary w-auto">{{ post.topic.name }}</span>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary floating-button-filter shadow btn-lg">
                    <i class="fa-solid fa-filter"></i>
                </button>
                <button class="btn btn-primary floating-button shadow btn-lg">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <Pagination :total-pages="totalPages" :per-page="10" :current-page="currentPage"
                    @pagechanged="onPageChange"></Pagination>
            </div>
            <div class="right-content pe-4 p-2 pt-4 fixed-top"
                style="margin-top: 60px; margin-left: auto; width: 20vw; z-index: 0;">
                <div class="card shadow-sm">
                    <div class="card-header">
                        Filter by topic
                    </div>
                    <div class="card-body">
                        <SearchTopics :assign-mode-prop="false" @getValue="searchByTopic"></SearchTopics>
                    </div>
                </div>
            </div>
        </div> <!-- end of wrapper -->
    </div>
</template>

<style scoped>
@import '../assets/style.css';
</style>

