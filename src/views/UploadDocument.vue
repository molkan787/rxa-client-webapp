<template>
    <div class="upload-document">
        <v-card elevation="1" max-width="600px">
            <v-card-title>Upload document</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-file-input v-model="file" :disabled="loading" label="Document file" placeholder="Click to select file" />
                    <v-btn @click="uploadClick" :loading="loading" color="primary" elevation="0" block>Upload</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { createRules } from '../../../rxa-clients-management/src/renderer/helpers/rules'
import DataManager from '../services/data-manager';
export default {
    data: () => ({
        loading: false,
        file: null,
        rules: createRules({ name: 'Document file', required: true })
    }),
    methods: {
        uploadClick(){
            if(this.validateForm()){
                this.uploadDocument();
            }
        },
        async uploadDocument(){
            this.loading = true;
            try {
                await DataManager.uploadDocument(this.file);
                this.file = null;
                alert('Document successfully uploaded!', 'Success');
            } catch (error) {
                console.error(error);
                alert('An error occured, Please try again.', 'Error');
            }
            this.loading = false;
        },
        validateForm(){
            if(this.file){
                return true;
            }else{
                alert('Please select a file to upload', 'Error');
                return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.upload-document{
    .v-card{
        margin: auto;
    }
}
</style>