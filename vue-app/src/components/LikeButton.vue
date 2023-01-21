<script>
export default {
    props: {
        idProp: String,
        likesProp: Number,
        likedProp: Boolean
    },

    data() {
        return {
            id: this.idProp,
            likes: this.likesProp,
            likeButtonColor: "gray",
            liked: this.likedProp
        }
    },
    methods: {
        async addLike() {
            await fetch(`http://localhost:3000/api/posts/${this.id}/likes`, {
                method: 'POST', credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            })
        },

        async removeLike() {
            fetch(`http://localhost:3000/api/posts/${this.id}/likes`, {
                method: 'DELETE', credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                }
            })
        },

        likePost() {
            if (this.likeButtonColor == "gray") {
                this.likeButtonColor = "#cd3c4b";
                this.likes++;
                this.liked = true;
                this.addLike();
            } else {
                this.likeButtonColor = "gray";
                this.likes--;
                this.liked = false;
                this.removeLike();
            }
        },
    },

    beforeMount() {
        if (this.likedProp) {
            this.likeButtonColor = "#cd3c4b";
        } else {
            this.likeButtonColor = "gray";
        }
    }
}   
</script>


<style scoped>
.circle {
    margin: -7px;
    margin-left: -9px;
    margin-right: -9px;
    padding: 7px;
    padding-left: 9px;
    padding-right: 9px;
    border-radius: 100vh;
}

.circle:hover {
    background-color: rgba(255, 74, 93, 0.2);
    color: rgb(205, 60, 75) !important;
}
</style>

<template>
    <button class="w-auto" @click="likePost()"
        style="padding: 0px; border: none; background: none; outline: none !important;"
        :style="{color: likeButtonColor }">
        <div style="display: flex; gap: 10px;">
            <div class="circle">
                <i v-if="liked" class="fa-solid fa-heart fs-4"></i>
                <i v-if="!liked" class="fa-regular fa-heart fs-4"></i>
            </div>

            {{ likes }}
        </div>
    </button>
</template>
