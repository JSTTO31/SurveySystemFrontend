import axios from "axios";
import { defineStore } from "pinia";

export const authApi = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        "Content-type": 'application/json'
    }
})

interface User{
    id: number;
    name: string;
    email: string;
    created_at: string;
    update_at: string;
}

interface UserState{
    user: User,
    token: string,
}


const userStore = defineStore('user', {
    state: () : UserState => ({
        user: {} as User,
        token: ''
    }),
    actions: {
        setUser(data:{user: User, token: string}){            
            this.user = data.user;
            this.token = data.token
            authApi.defaults.headers['Authorization'] = `Bearer ${data.token}`
        },
        unSetUser(){
            localStorage.removeItem('userData');
            window.location.reload()
        },
        login(data: {email: string, password: string}){
            return axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
                return authApi.post('/login', data).then((response) => {
                    localStorage.setItem('userData', JSON.stringify(response.data));
                    this.setUser(response.data)
                })
            })
        },
        register(data: {name: string, email:string, password:string, password_confirmation: string}){
            return axios.get('http://localhost:8000/sanctum/csrf-cookie').then(() => {
                return authApi.post('/register', data).then((response) => {
                    
                })
            })
        },
        logout(){
            this.unSetUser();
            return authApi.post('/logout')
        }
    },
    getters: {
        isLogin: state =>  {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            return Object.keys(userData).length > 0
        }
    }
})


export default userStore