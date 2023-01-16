<script>
import Navbar from '../components/Navbar.vue';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            text: "Bookmarks"
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

