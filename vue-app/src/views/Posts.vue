<script>
    import Navbar from '../components/Navbar.vue';

    export default {
        components: {
            Navbar
        },
        data() {
            return {
                text: "Posts"
            }
        },
        methods: {
            
        }
    };
</script>

<template>
    <div>
        <Navbar></Navbar>
        <img src="../assets/icon.svg" width="300" height="300"/>
        {{ text }}
    </div>
</template> 