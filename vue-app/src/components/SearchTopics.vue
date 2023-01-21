<script>
export default {
    props: {
        assignModeProp: Boolean
    },
    emits: {
        getValue: null
    },
    data() {
        return {
            dropdown: "",
            assignMode: this.assignModeProp,
            selectedTopic: "",
            selectedTopicVisible: false,
            inputVisible: true,
            topicsButtonVisible: true,
            topicNotFound: true,
            topicsInput: "",
            topics: [],
        }
    },
    methods: {
        async getTopics(input) {
            await fetch(`http://localhost:3000/api/topics?name=${input}`).then(res => res.json()).then(data => {
                this.topics = data;
            });
        },

        selectTopic(topicValue) {
            if (!this.selectedTopic) {
                this.inputVisible = false;
                this.topicsButtonVisible = false;
                this.selectedTopic = topicValue;
                this.selectedTopicVisible = true;
                this.emitSelectedTopic();
                this.dropdown = "";
            }
        },

        deselectTopic() {
            this.dropdown = "";
            this.inputVisible = true;
            this.topicsButtonVisible = true;
            this.selectedTopic = "";
            this.topicsInput = "";
            this.topics = [];
            this.selectedTopicVisible = false;
            this.emitSelectedTopic();
        },

        searchTopics() {
            if (this.topicsInput) {
                this.dropdown = "show";
                this.getTopics(this.topicsInput);
                this.topicNotFound = true;
                this.topics.forEach(topic => {
                    if (this.topicsInput === topic.name) {
                        this.topicNotFound = false;
                    }
                });
            } else {
                this.topics = [];
                this.dropdown = "";
            }
        },

        emitSelectedTopic() {
            this.$emit('getValue', this.selectedTopic);
        }
    }
};
</script>

<template>
    <div v-if="!inputVisible">
        <button style="width: 100%;" class="btn btn-primary" v-if="selectedTopicVisible" @click="deselectTopic()">{{
            selectedTopic
        }}</button>
    </div>

    <div class="dropdown-center">
        <input class="form-control" type="text" placeholder="Topic" v-if="inputVisible" @input="searchTopics()"
            v-model="topicsInput">
        <ul class="dropdown-menu" :class="dropdown" aria-labelledby="dropdownMenuButton1"
            style="width: 100%; max-height: 220px; overflow: scroll;">
            <button style="border: none; border-radius: 0; width: 100%;" class="btn btn-outline-primary"
                v-if="assignMode && topicNotFound && topicsButtonVisible && topicsInput"
                @click="selectTopic(topicsInput)">{{ topicsInput }}</button>
            <button style="border: none; border-radius: 0; width: 100%;" class="btn btn-outline-primary"
                v-for="topic in topics" @click="selectTopic(topic.name)" v-if="topicsButtonVisible">
                {{ topic.name }}
            </button>
        </ul>
    </div>

</template> 
