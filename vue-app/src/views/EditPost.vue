<script>
import Navbar from '../components/Navbar.vue';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            text: "EditPost"
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