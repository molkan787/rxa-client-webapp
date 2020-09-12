import axios from 'axios';
import store from '../store';

export default class DataManager{

    static get API_BASE_URL(){
        return window.DEV ? 'http://localhost:3000' : 'https://api.amaccountancys.com';
    }

    static loadInitialData(){
        this.loadEntryCategories();
    }

    static async loadEntryCategories(){
        const { data } = await axios.get(`${this.API_BASE_URL}/entry-categories/mine`);
        store.state.entryCategories = data;
    }

    static addEntry(data){
        return axios.post(`${this.API_BASE_URL}/accounting-entry/add`, data);
    }

    static uploadDocument(file){
        const formData = new FormData();
        formData.append('file', file);
        return axios.post(`${this.API_BASE_URL}/client-documents/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

}