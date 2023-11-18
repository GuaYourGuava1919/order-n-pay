<template>
    <q-dialog v-model="open" persistent>
        <q-card>
            <q-icon name="close" class="q-ma-md" size="2em" color="primary" @click="onClose"/>
            <q-form
            @submit="signIn"
            >
            <q-card-section class="q-ma-md q-pa-mb flex justify-center items-center text-h6" >
                登入
            </q-card-section>
            <q-card-section class="q-ma-md">
            <q-input
                class="q-mb-md"
                filled
                v-model="account.email"
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
                v-model="account.password"
                label="請輸入密碼"
                type="password"
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
                <q-btn label="註冊" color="primary" flat class="q-ml-sm" @click="toggle"/>
                <q-btn label="登入" type="submit" color="primary"/>
            </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
    
<script>
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from "../setting/FirebaseConfig.vue";
    export default {
        name: 'SignIn',
        data () {
            return {
                account: {
                    email: '',
                    password: '',
                },
            }
        },
        computed: {
            open :{
                get() {
                    return this.$store.state.openSignIn
                },
                set(value) {
                    this.$store.commit('setOpenSignIn', value)
                }
            },
        },
        methods: {
            onClose () {
                this.open = false
                this.account.email = ''
                this.account.password = ''
            },
            async signIn() {
                const auth = getAuth(app)
                const res = await signInWithEmailAndPassword(auth, this.account.email, this.account.password)
                if (res.user) {
                    console.log(res.user)
                    console.log('登入成功')
                    this.onClose()
                }
            },
            toggle () {
                this.$store.commit('toggleOpenSignUp')
            }
               
        },
    }
</script>
    
<style scoped>
    
</style>