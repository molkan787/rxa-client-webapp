import DataManager from './data-manager';
import axios from 'axios';
import store from '../store';
import router from '../router';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_INFO_KEY = 'user_info';

export default class Session{

    static loadState(){
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        const raw_user = localStorage.getItem(USER_INFO_KEY);
        const user = raw_user ? JSON.parse(raw_user) : null;
        if(token){
            const state = store.state.session;
            state.token = token;
            state.user = user;
            state.signedIn = true;
            this.useToken(token);
            this.loadInitialData();
            const route = window.location && window.location.pathname;
            if(route == '/login'){
                router.replace('/');
            }
        }else{
            router.replace('/login');
        }
    }

    static async loadInitialData(){
        try {
            await DataManager.loadInitialData();
        } catch (error) {

        }
    }

    static logout(){
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.location.reload();
    }

    static async login(username, password){
        try {
            const url = `${DataManager.API_BASE_URL}/auth`;
            const { data } = await axios.post(url, {
                username,
                password,
            });
            this._setSession(data);
            this.loadInitialData();
            return true;
        } catch (error) {
            console.error(error);
            if(error.response && error.response.status == 401){
                return false;
            }else{
                throw error;
            }
        }
    }

    static _setSession(data){
        const state = store.state.session;
        const { access_token, user } = data;
        state.user = user;
        state.token = access_token;
        state.signedIn = true;
        window.localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
        window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
        this.useToken(access_token);
    }

    static useToken(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

}

axios.interceptors.response.use(resp => resp, error => {
    console.log(error)
    if(isUnauthorized(error) && !hasAuthUrl(error)){
        try {
            store.state.session.signedIn = false;
            window.localStorage.removeItem(ACCESS_TOKEN_KEY);
            router.replace('/login');
        } catch (error) {
        }
    }else{
        return Promise.reject(error);
    }
})

function isUnauthorized(error){
    return error.response && error.response.status == 401;
}

function hasAuthUrl(error){
    return (error.config && error.config.url) == `${DataManager.API_BASE_URL}/auth`;
}