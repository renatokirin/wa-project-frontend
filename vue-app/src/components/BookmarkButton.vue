<script>
import config from '../config.js';
export default {
    props: {
        idProp: String,
        bookmarkedProp: Boolean
    },

    data() {
        return {
            id: this.idProp,
            bookmarkButtonColor: "gray",
            bookmarked: this.bookmarkedProp
        }
    },
    methods: {
        async addBookmark() {
            await fetch(config.baseUrl + `/api/users/bookmarks/${this.id.valueOf()}`, {
                method: 'POST', credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            });
        },

        async deleteBookmark() {
            await fetch(config.baseUrl + `/api/users/bookmarks/${this.id.valueOf()}`, {
                method: 'DELETE', credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            });
        },

        bookmarkPost() {
            if (this.bookmarkButtonColor == "gray") {
                this.bookmarkButtonColor = "#218fa5";
                this.bookmarked = true;
                this.addBookmark();
            } else {
                this.bookmarkButtonColor = "gray";
                this.bookmarked = false;
                this.deleteBookmark();
            }
        },
    },
    beforeMount() {
        if (this.bookmarkedProp) {
            this.bookmarkButtonColor = "#218fa5";
        } else {
            this.bookmarkButtonColor = "gray";
        }
    }
}   
</script>

<style scoped>
.circle {
    margin: -7px;
    margin-left: -12px;
    margin-right: -12px;
    padding: 7px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 100vh;
}

.circle:hover {
    background-color: rgba(33, 143, 165, 0.2);
    color: rgb(33, 143, 165) !important;
}
</style>

<template>
    <button class="w-auto" @click="bookmarkPost()"
        style="padding: 0px; border: none; background: none; outline: none !important;"
        :style="{color: bookmarkButtonColor }">
        <div style="display: flex; gap: 10px;">
            <div class="circle">
                <i v-if="!bookmarked" class="fa-regular fa-bookmark fs-4"></i>
                <i v-if="bookmarked" class="fa-solid fa-bookmark fs-4"></i>
            </div>
        </div>

    </button>
</template>