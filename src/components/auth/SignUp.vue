<template>
    <q-dialog v-model="open">
        <q-card>
            <q-form
            @submit="onSubmit"
            @reset="onReset"
            >
            <q-card-section class="q-ma-md q-pa-mb flex justify-center items-center" >
                <q-card-title class="text-h5">註冊</q-card-title>
            </q-card-section>
            <q-card-section class="q-ma-md">
            <q-input
                class="q-mb-md"
                filled
                v-model="name"
                label="請輸入名稱"
                hide-bottom-space
                lazy-rules
                :rules="[ val => val && val.length > 0 || '名稱不能為空']"
            />
        
            <q-input
                class="q-mb-md"
                filled
                v-model="email"
                type="email"
                label="請輸入電子郵件"
                hide-bottom-space
                lazy-rules
                :rules="[
                val => !!val || '電子郵件不能為空',
                val => /.+@.+\..+/.test(val) || '請輸入有效的電子郵件地址'
                ]"
            />
        
            <q-input
                class="q-mb-md"
                filled
                v-model="password"
                label="請輸入密碼"
                hide-bottom-space
                lazy-rules
                :rules="[
                val => !!val || '密碼不能為空',
                val => (val && val.length >= 6) || '密碼至少需要6個字符',
                // val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(val) || '密碼需要包含至少一個小寫字母、一個大寫字母和一個數字'
                ]"
            />
            </q-card-section>
            <q-card-actions align="right" class="text-primary q-ma-md">
                <q-btn label="清空" type="reset" color="primary" flat class="q-ml-sm" />
                <q-btn label="註冊" type="submit" color="primary" class=""/>
            </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
    
<script>
    export default {
        name: 'SignUp',
        data () {
            return {
                name: '',
                email: '',
                password: '',
            }
        },
        computed: {
            open :{
                get() {
                    return this.$store.state.open
                },
                set(value) {
                    this.$store.commit('setOpen', value)
                }
            },
        },
        methods: {
            onSubmit () {
                
            },
            onReset () {
                this.name = ''
                this.email = ''
                this.password = ''
            }
               
        }
    }
</script>
    
<style scoped>
    
</style>