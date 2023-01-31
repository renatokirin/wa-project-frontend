import { reactive } from 'vue';


export const store = reactive({
    selectedPostId: JSON.parse(localStorage.getItem('selectedPostId') || "{}"),
    selectedUserId: JSON.parse(localStorage.getItem('selectedUserId') || "{}"),
    postToEditId: JSON.parse(localStorage.getItem('postToEditId') || "{}"),

    setSelectedPostId(id) {
        this.selectedPostId = id;
        localStorage.setItem("selectedPostId",JSON.stringify(this.selectedPostId));
    },

    setSelectedUserId(id) {
        this.selectedUserId = id;
        localStorage.setItem("selectedUserId",JSON.stringify(this.selectedUserId));
    },

    setPostToEditId(id) {
        this.postToEditId = id;
        localStorage.setItem("postToEditId",JSON.stringify(this.postToEditId));
    }
});