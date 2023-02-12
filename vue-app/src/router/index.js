import { createRouter, createWebHistory } from 'vue-router';
import Posts from '../views/Posts.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import SinglePage from '../views/SinglePage.vue';
import CreatePost from '../views/CreatePost.vue';
import EditPost from '../views/EditPost.vue';
import UserProfile from '../views/UserProfile.vue';
import MyProfile from '../views/MyProfile.vue';
import Bookmarks from '../views/Bookmarks.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'latest',
      component: Posts
    },
    {
      path: '/post',
      name: 'post',
      component: SinglePage
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/user',
      name: 'user',
      component: UserProfile
    },      
    {
        path: '/createpost',
        name: 'createpost',
        component: CreatePost
    },  
    {
        path: '/my',
        name: 'my',
        component: MyProfile
    },            
    {
        path: '/editpost',
        name: 'editpost',
        component: EditPost
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: Bookmarks
    },
  ]
});

export default router;
