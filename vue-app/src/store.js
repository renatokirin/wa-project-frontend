import { reactive } from 'vue';


export const store = reactive({
    selectedPostId: JSON.parse(localStorage.getItem('selectedPostId') || "{}"),
    selectedUserId: JSON.parse(localStorage.getItem('selectedUserId') || "{}"), 

    setSelectedPostId(id) {
        this.selectedPostId = id;
        localStorage.setItem("selectedPostId",JSON.stringify(this.selectedPostId));
    },

    setSelectedUserId(id) {
        this.selectedUserId = id;
        localStorage.setItem("selectedUserId",JSON.stringify(this.selectedUserId));
    }
});