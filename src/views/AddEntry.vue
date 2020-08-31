<template>
    <div class="add-entry">
        <v-card elevation="1" max-width="600px">
            <v-card-title>Add Expense</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="form.date" :readonly="loading" :rules="rules.date" label="Date" type="date"/>
                    <v-select v-model="form.category" :readonly="loading" :rules="rules.category" :items="entryCategories" label="Expense category" placeholder="expense type" />
                    <v-text-field v-model.number="form.amount" :readonly="loading" :rules="rules.amount" label="Amount (£)" type="number" placeholder="0.00"/>
                    <v-textarea v-model.trim="form.note" :readonly="loading" :rules="rules.note" label="Note/Comment" placeholder="note/comment" />
                    <v-btn @click="addClick" :loading="loading" elevation="0" color="primary" block>Add</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { createRules } from '../../../rxa-clients-management/src/renderer/helpers/rules'
import DataManager from '../services/data-manager';
export default {
    computed: mapState(['entryCategories']),
    data: () => ({
        loading: false,
        form: {},
        rules: {
            date: createRules({ name: 'Date', required: true }),
            category: createRules({ name: 'Expense category', required: true }),
            amount: createRules({ name: 'Amount', required: true, min: 0.01 }),
            note: createRules({ name: 'Note', required: false, maxLength: 2000 })
        }
    }),
    methods: {
        addClick(){
            if(this.$refs.form.validate()){
                this.addEntry();
            }
        },
        async addEntry(){
            this.loading = true;
            try {
                const { date, ...props } = this.form;
                const data = {
                    entry_type: 'expense',
                    date: new Date(date).toJSON(),
                    ...props,
                }
                await DataManager.addEntry(data);
                this.reset();
                alert('Expense entry successfully added!', 'Success');
            } catch (error) {
                console.error(error);
                alert('An error occured, Please try again', 'Error');
            }
            this.loading = false;
        },
        clearForm(){
            this.form = {
                date: '',
                category: '',
                amount: '',
                note: '',
            };
        },
        reset(){
            this.$refs.form && this.$refs.form.resetValidation();
            this.clearForm();
        }
    },
    created(){
        this.reset();
    }
}
</script>

<style lang="scss" scoped>
.add-entry{
    .v-card{
        margin: auto;
    }
}
</style>