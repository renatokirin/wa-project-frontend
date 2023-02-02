<script>
import Navbar from '../components/Navbar.vue';
import Pagination from '../components/Pagination.vue';
import { store } from '../store.js';
import { formatDate, monthYear } from '../utils/formatDate';
import FollowerList from '../components/FollowerList.vue';
import SearchTopics from '../components/SearchTopics.vue';

export default {
    components: {
        Navbar,
        FollowerList,
        Pagination,
        SearchTopics
    },
    data() {
        return {
            id: store.selectedUserId,
            user: {},
            posts: [],
            currentPage: 1,
            totalPages: 10,
            topicName: "",
            formatDate,
            monthYear,
            followers: 0,
            following: 0,
            postsCount: 0,
            profilePicture: null,
            followersArray: [],
            followingArray: [],
            followDataExists: false,
        }
    },
    methods: {
        async getPosts() {
            await fetch(`http://localhost:3000/api/users/${this.id}?page=${this.currentPage}&limit=${10}&topic=${this.topicName}`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.posts = data.posts;
                this.user = data.userInfo;
                if (this.user.isFollowed != null) this.followDataExists = true;
                this.followers = data.followers;
                this.following = data.following;
                this.totalPages = data.totalPages;
                this.postsCount = data.count;

                if (data.userInfo.profilePicture.image.data) {
                    let img = btoa(
                        String.fromCharCode(...new Uint8Array(data.userInfo.profilePicture.image.data.data))
                    );
                    this.profilePicture = `data:image/png;base64,${img}`;
                }
            });
        },

        async getFollowers() {
            await fetch(`http://localhost:3000/api/users/${this.id}/followers`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.followersArray = data;
            });
        },

        async getFollows() {
            await fetch(`http://localhost:3000/api/users/${this.id}/follows`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.followingArray = data;
            });
        },

        async followUser() {
            if (!this.user.isFollowed) {
                this.user.isFollowed = true;
                await fetch(`http://localhost:3000/api/users/follows/${this.id}`, {
                    method: 'POST', credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                }).then(() => window.location.reload());
            } else {
                this.user.isFollowed = false;
                await fetch(`http://localhost:3000/api/users/follows/${this.id}`, {
                    method: 'DELETE', credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                }).then(() => window.location.reload());
            }
        },

        searchByTopic(string) {
            this.topicName = string;
            this.getPosts();
        },

        toPostPage(id) {
            store.setSelectedPostId(id);
            this.$router.push('/post');
        },

    },
    beforeMount() {
        this.getPosts();
    }
};
</script>

<template>
    <div>
        <Navbar></Navbar>

        <div class="wrapper">
            <div class="posts-container pt-4 p-4">
                <div class="card mb-3 shadow-sm">

                    <div class="p-5 m-0 row bg-light rounded-top about-user" style="display: flex; gap: 10px;">
                        <h3 class="w-auto" style="display: flex; align-items: center; gap: 45px;">
                            <img v-if="!profilePicture" src="../assets/profilepicWhiteBackground.png"
                                style="width: 100px; height: 100px; border-radius: 100vh;" />
                            <img v-if="profilePicture" :src="profilePicture"
                                style="width: 100px; height: 100px; border-radius: 100vh;" />
                            <div>
                                @{{ user.username }}
                            </div>
                        </h3>
                        <div class="w-auto column ms-auto user-info">
                            <div class="fw-bold">Posts</div>
                            <div style="text-align: center;">{{ postsCount }}</div>
                        </div>

                        <div class="w-auto row user-info">
                            <FollowerList class="mx-2" @click="getFollowers()" :text-prop="'Followers'"
                                :value-prop="followers" :users="followersArray"></FollowerList>
                            <FollowerList @click="getFollows()" :text-prop="'Following'" :value-prop="following"
                                :users="followingArray"></FollowerList>
                        </div>


                        <button v-if="followDataExists" class="ms-2 btn btn-info text-white follow-bt user-info"
                            style="height: 40px; width: 100px;" @click="followUser()">
                            <p v-if="!user.isFollowed">Follow</p>
                            <p v-if="user.isFollowed" class="text-muted">Following</p>
                        </button>

                        <button v-if="followDataExists"
                            class="mt-4 btn btn-info text-white follow-bt follow-bt-bottom px-auto"
                            @click="followUser()">
                            <p v-if="!user.isFollowed">Follow</p>
                            <p v-if="user.isFollowed" class="text-muted">Following</p>
                        </button>

                        <div class="mt-4 bottom-info">
                            <div class="w-auto column">
                                <div class="fw-bold">Posts</div>
                                <div style="text-align: center;">{{ postsCount }}</div>
                            </div>

                            <FollowerList @click="getFollowers()" :text-prop="'Followers'" :value-prop="followers"
                                :users="followersArray"></FollowerList>
                            <FollowerList @click="getFollows()" :text-prop="'Following'" :value-prop="following"
                                :users="followingArray"></FollowerList>

                        </div>
                    </div>
                    <div class="p-3" style="display: flex; flex-direction: column;">
                        <h5 class="card-title fw-bold">About</h5>
                        <div class="text-muted mb-4">
                            <i class="fa-solid fa-calendar-days me-1"></i> Joined {{ monthYear(user.signUpDate) }}
                        </div>
                        <p class="card-text">
                            {{ user.about }}
                        </p>
                    </div>
                </div>


                <div class="card post mb-3 shadow-sm" v-for="post in posts">
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

                <Pagination v-if="posts.length != 0" :total-pages="totalPages" :per-page="10" :current-page="currentPage"
                    @pagechanged="onPageChange"></Pagination>

                <button class="btn btn-primary floating-button-filter shadow btn-lg" data-bs-toggle="modal"
                    data-bs-target="#filterModal">
                    <i class="fa-solid fa-filter"></i>
                </button>

                <!-- Modal -->
                <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Filter by topic</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <SearchTopics :assign-mode-prop="false" @getValue="searchByTopic"></SearchTopics>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
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
        </div>
    </div>
</template> 

<style scoped>
@import '../assets/style.css';

.followers-btn,
.following-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    height: 50px;
    cursor: pointer;
    border-radius: 10px;
    border-top: 3px solid rgba(49, 210, 242, 1);

}

.followers-btn:hover,
.following-btn:hover {
    background-color: rgba(49, 210, 242, 0.6);
    color: white;
}
</style>