<script>
import Navbar from '../components/Navbar.vue';
import { store } from '../store.js';
import config from '../config.js';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            id: store.postToEditId,
            title: "",
            description: "",
            markdown: "",
            errorMsg: null
        }
    },
    methods: {

        async editPost() {
            let json = { "title": this.title, "description": this.description, "markdown": this.markdown, "topicName": this.topicName };

            await fetch(config.baseUrl + `/api/posts/${this.id}`, {
                method: 'PATCH', credentials: 'include',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                if (data.id) {
                    this.toPostPage(data.id);
                } else {
                    if (data.error) {
                        this.errorMsg = data.error;
                    } else {
                        this.errorMsg = "Something went wrong";
                    }
                }
            });
        },

        async getPost() {
            await fetch(config.baseUrl + `/api/posts/${this.id}`, {
                method: 'GET', credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }).then(res => res.json()).then(data => {
                this.title = data.title;
                this.description = data.description;
                this.markdown = data.markdown;
            });
        },

        toPostPage(id) {
            store.setSelectedPostId(id);
            this.$router.push('/post');
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
                        <button class="btn btn-primary w-auto ms-auto me-3" @click="editPost()">Save</button>
                    </div>

                    <div class="alert alert-danger py-1 my-1 mx-1 mt-4 w-auto" role="alert" v-if="errorMsg">
                        {{ errorMsg }}
                    </div>

                    <div class="column mt-4">
                        <input class="form-control" type="text" placeholder="Title" v-model="title">
                        <textarea class="form-control mt-2" cols="80" rows="2" placeholder="Description"
                            v-model="description"></textarea>
                    </div>

                </div>

            </div>

            <div class="card px-3 pb-5 pt-3"
                style="border-top: none; border-top-right-radius: 0; border-top-left-radius: 0;">
                <textarea class="form-control" cols="80" rows="30" placeholder="Go ahead, put anything."
                    v-model="markdown"></textarea>
            </div>

        </div>


    </div>
</template> 

<style scoped>
@import '../assets/singlePage.css';
</style>