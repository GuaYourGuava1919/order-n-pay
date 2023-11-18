<template>
    <q-dialog v-model="open " persistent>
        <q-card>
            <q-form
            @submit="signUp"
            @reset="onReset"
            >
            <q-card-section class="q-ma-md q-pa-mb flex justify-center items-center text-h6" >
                註冊
            </q-card-section>
            <q-card-section class="q-ma-md">
            <q-input
                class="q-mb-md"
                filled
                v-model="account.name"
                label="請輸入名稱"
                hide-bottom-space
                lazy-rules
                :rules="[ val => val && val.length > 0 || '名稱不能為空']"
            />
            <q-select class="q-mb-md" v-model="account.payment" filled :options="options" label="選擇常用付款方式"  
                hide-bottom-space
                lazy-rules
                :rules="[ val => val && val.length > 0 || '付款方式不能為空']"/>
            <q-input
                class="q-mb-md"
                filled
                v-model="account.bankAccount"
                label="請輸入常用銀行帳號"
            />
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
                <q-btn label="取消" type="reset" color="primary" flat class="q-ml-sm" v-close-popup/>
                <q-btn label="註冊" type="submit" color="primary" class=""/>
            </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
    
<script>
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from "../setting/FirebaseConfig.vue";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
    export default {
        name: 'SignUp',
        data () {
            return {
                account: {
                    email: '',
                    password: '',
                    name: '',
                    payment: '',
                    bankAccount: '',
                },
                options: [
                    'Line Pay','現金支付','銀行轉帳'
                ]
            }
        },
        computed: {
            open :{
                get() {
                    return this.$store.state.openSignUp
                },
                set(value) {
                    this.$store.commit('setOpenSignUp', value)
                }
            },
        },
        methods: {
            onReset () {
                this.account.email = ''
                this.account.password = ''
                this.account.name = ''
                this.account.payment = ''
                this.account.bankAccount = ''
            },
            async signUp() {
                const auth = getAuth(app)
                const db = getFirestore(app);
                const res = await createUserWithEmailAndPassword(auth, this.account.email, this.account.password)
                await setDoc(doc(db, "user", res.user.uid), {
                    name: this.account.name,
                    email: this.account.email,
                    auth: "normal",
                    payment: this.account.payment,
                    bankAccount: this.account.bankAccount,
                });
                if (res.user) {
                    console.log(res.user)
                    console.log('註冊成功')
                    this.open = false
                    this.onReset()
                }
            }
               
        }
    }
</script>
    
<style scoped>
    
</style>