<script>
import '../assets/bootstrap.bundle';
</script>
<template>
    <nav class="navbar navbar-light bg-light navbar-expand-lg px-4" style="top: 0; position: sticky; z-index: 99;">
        <a href="/" class="navbar-brand">Your blog</a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav w-100">
                <li class="navbar-item">
                    <a href="/bookmarks" class="nav-link">Bookmarks</a>
                </li>
                <li class="navbar-item ms-auto">

                    <div class="dropdown">
                        <button class="btn btn-info text-light dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            @username
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item px-5" href="#">My posts</a></li>
                            <li><a class="dropdown-item px-5" href="#">Account settings</a></li>
                            <li><a class="dropdown-item px-5" href="#">Sign out</a></li>
                        </ul>
                    </div>

                </li>

            </ul>
        </div>
    </nav>
</template>

<style scoped>
.btn-info:focus,
.btn-info:active {
    outline: none !important;
    box-shadow: none !important;
}
</style>