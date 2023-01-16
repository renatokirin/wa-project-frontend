<script>
import Navbar from '../components/Navbar.vue';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            text: "MyProfile"
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