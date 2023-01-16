<script>
import Navbar from '../components/Navbar.vue';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            text: "CreatePost"
        }
    },
    methods: {

    }
};
</script>

<template>
    <div>
        <Navbar></Navbar>
        {{ text }}
    </div>
</template> 