import { reactive } from 'vue'

export const store = reactive({
    selectedPostId: "",
    selectedUserId: "",

    setSelectedPostId(id) {
        this.selectedPostId = id;
    },

    setSelectedUserId(id) {
        this.selectedUserId = id;
    }
});