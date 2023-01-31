<script>
import Navbar from '../components/Navbar.vue';
import Pagination from '../components/Pagination.vue';
import { store } from '../store.js';
import { formatDate, monthYear } from '../utils/formatDate';
import FollowerList from '../components/FollowerList.vue';

export default {
    components: {
        Navbar,
        FollowerList,
        Pagination
    },
    data() {
        return {
            id: eval(this.$cookies.get("id")),
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
            selectorOpened: false,
            file: Object
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

        async deletePost(selectedId, title) {
            if (window.confirm(`Delete the post ' ${title} '`)) {
                await fetch(`http://localhost:3000/api/posts/${selectedId}`, {
                    method: 'DELETE', credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                }).then(res => res.json()).then(data => {
                    if (data.deleted) window.location.reload();
                });
            }
        },

        toEditPost(selectedId) {
            store.setPostToEditId(selectedId);
            this.$router.push('/editpost');
        },

        openFileselector() {
            if (this.selectorOpened) this.selectorOpened = false;
            else this.selectorOpened = true;
        },

        async changeProfilepicture() {
            const imageData = new FormData();
            const fileField = document.querySelector('input[type="file"]');
            imageData.append("name", "textImage")
            let myFile = fileField.files[0];
            imageData.append("profilepicture", myFile);

            await fetch(`http://localhost:3000/api/users/editProfilePicture`, {
                method: 'PATCH', credentials: 'include',
                body: imageData
            }).then(() => {
                window.location.reload();
            });
        }

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
                            <div class="open-selector" @click="openFileselector()">
                                <img v-if="!profilePicture" src="../assets/profilepicWhiteBackground.png"
                                    style="width: 100px; height: 100px; border-radius: 100vh;" />
                                <img v-if="profilePicture" :src="profilePicture"
                                    style="width: 100px; height: 100px; border-radius: 100vh;" />
                            </div>

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

                    <div class="m-2 mt-3" style="display: flex; align-items: center;" v-if="selectorOpened">
                        <input style="font-size: 14px;" type="file" ref="file" accept="image/*" @change="" />
                        <button class="btn btn-info py-0 mt-2" style="font-size: 14px; color: white;" @click="changeProfilepicture()">Change</button>
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
                        <h5 class="card-title fw-bold">{{ post.title }}</h5>
                        <p class="card-text">
                            {{ post.description }}
                        </p>
                        <div class="row">
                            <div class="text-muted w-auto">{{ formatDate(post.createdAt) }}</div>
                            <span class="badge bg-primary w-auto" style="height: 25px;">{{ post.topic.name }}</span>
                            <button class="btn btn-info btn-sm text-white w-auto ms-auto desktop-option"
                                @click="toEditPost(post._id)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-danger btn-sm text-white w-auto ms-2 me-2 desktop-option"
                                @click="deletePost(post._id, post.title)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>

                        <div class="px-2.5 pt-3" style="display: flex; gap: 5px;">
                            <button class="btn btn-info btn-sm text-white mobile-option" style="flex: 1;"
                                @click="toEditPost(post._id)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-danger btn-sm text-white mobile-option" style="flex: 1;"
                                @click="deletePost(post._id, post.title)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <Pagination :total-pages="totalPages" :per-page="10" :current-page="currentPage"
                    @pagechanged="onPageChange"></Pagination>

                <button class="btn btn-primary floating-button-filter shadow btn-lg">
                    <i class="fa-solid fa-filter"></i>
                </button>
            </div>

            <div class="right-content pe-4 p-2 pt-4 fixed-top"
                style="margin-top: 60px; margin-left: auto; width: 20vw; z-index: 0;">
                <div class="card shadow-sm">
                    <div class="card-header">
                        Filter by topic
                    </div>
                    <div class="card-body">
                        <input type="text" class="form-control">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> 

<style scoped>
@import '../assets/style.css';

.open-selector {
    cursor: pointer;
}

.open-selector:hover {
    scale: 120%;
}

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