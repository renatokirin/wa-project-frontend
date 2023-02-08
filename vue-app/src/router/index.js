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
import config from '../config';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `${config.baseFrontendUrl}/`,
      name: 'latest',
      component: Posts
    },
    {
      path: `${config.baseFrontendUrl}/post`,
      name: 'post',
      component: SinglePage
    },
    {
      path: `${config.baseFrontendUrl}/signin`,
      name: 'signin',
      component: SignIn
    },
    {
      path: `${config.baseFrontendUrl}/signup`,
      name: 'signup',
      component: SignUp
    },
    {
      path: `${config.baseFrontendUrl}/user`,
      name: 'user',
      component: UserProfile
    },      
    {
        path: `${config.baseFrontendUrl}/createpost`,
        name: 'createpost',
        component: CreatePost
    },  
    {
        path: `${config.baseFrontendUrl}/my`,
        name: 'my',
        component: MyProfile
    },            
    {
        path: `${config.baseFrontendUrl}/editpost`,
        name: 'editpost',
        component: EditPost
    },
    {
      path: `${config.baseFrontendUrl}/bookmarks`,
      name: 'bookmarks',
      component: Bookmarks
    },
  ]
});

export default router;
