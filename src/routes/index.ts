import { authApi } from './../store/user';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from "vue-router"
import Index from '../pages/Survey/index.vue'
import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'
import Dashboard from '../pages/Survey/Dashboard.vue'
import MySurvey from '../pages/Survey/MySurvey.vue'
import ShowSurvey from '../pages/Survey/ShowSurvey.vue'
import userStore from '../store/user';
import surveyStore from '../store/survey';
import QuestionnaireDesign from '../pages/Survey/ShowSurvey/QuestionnaireDesign.vue'
import Summary from '../pages/Survey/ShowSurvey/Summary.vue'
import Individual from '../pages/Survey/ShowSurvey/Individual.vue'
import ViewSurvey from '../pages/Survey/ViewSurvey.vue'
import Home from '../pages/Home.vue'
import MySurveyIndex from '../pages/Survey/MySurvey/Index.vue'
import MySurveyFolder from '../pages/Survey/MySurvey/Folder.vue'
import MySurveyTrashed from '../pages/Survey/MySurvey/Trashed.vue'
import Forum from '../pages/Survey/Forum.vue'

const routes = [
    {
        path: '/',
        name: 'survey.home',
        component: Home,
    },
    {
        path: '/dashboard',
        name: 'survey.dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/my-survey',
        name: 'survey.my-survey',
        component: MySurvey,
        children: [
            {
                path: '',
                component: MySurveyIndex,
                name: 'my-survey.index'
            },
            {
                path: 'folder/:id',
                component: MySurveyFolder,
                name: 'my-survey.folder',
                //@ts-ignore
                async beforeEnter (to, from, next) {
                    const {folders, folder} = storeToRefs(surveyStore());
                    const existsFolder = folders.value.find(item => item.id == to.params.id)
                    if(existsFolder){
                        folder.value = existsFolder
                        return next();
                    }

                    try{
                        const response = await authApi.get('/folders/' + to.params.id);
                        folder.value = response.data
                        next()
                        return response
                    }catch(e){
                        console.log(e);
                        
                    }

                    
                }
            },
            {
                path: 'trashed',
                component: MySurveyTrashed,
                name: 'my-survey.trashed'
            },
        ],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:id/show',
        name: 'survey.show',
        component: ShowSurvey,
        //@ts-ignore
        async beforeEnter (to, from, next) {
            const {survey, findSurveyById} = storeToRefs(surveyStore());

            if(survey.value.id != to.params.id){
                const exists = findSurveyById.value(to.params.id)
                if(!exists){
                    const response = await authApi.get('/surveys/' + to.params.id)
                    survey.value = response.data
                    return next()
                }
                
                survey.value = exists
                return next();
            }
            
            return next();
            
        },
        children: [
            {
                path: 'design',
                name: 'survey.show.design',
                component: QuestionnaireDesign,
            },
            {
                path: 'summary',
                name: 'survey.show.summary',
                component: Summary,
            },
            {
                path: 'responses',
                name: 'survey.show.individual',
                component: Individual,
            }
        ],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:id/view',
        name: 'survey.view',
        component: ViewSurvey,
        props: true,
        //@ts-ignore
        async beforeEnter (to, from, next) {
            const {data} = await authApi.get('/surveys/' + to.params.id);
            to.params.survey = data;
            return next();
        }
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            auth: true,
        },
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            auth: true,
        },
        component: Register,
    },
    {
        path: '/forum',
        name: 'Forum',
        meta: {
            requiresAuth: true,
        },
        component: Forum,
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const {isLogin} = storeToRefs(userStore())
    
    if(to.meta.requiresAuth && !isLogin.value){
        return next('/login');
    }

    if(to.meta.auth && isLogin.value){
        return next('/dashboard');
    }

    // if(!to.meta.requiresAuth && isLogin.value){
    //     return next('/');
    // }

    return next()
})

export default router
