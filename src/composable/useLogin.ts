import { reactive, ref } from "vue";
import userStore from '../store/user'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useRouter } from "vue-router";

export default function(){
    const $userStore = userStore();
    const $externalResults = ref({});
    const login = reactive({
        email: '',
        password: '',
    })
    const loading = ref(false);
    const router = useRouter()
    const signIn = () => {
        $v.value.$touch();
        if(!$v.value.$invalid){
            loading.value = true
            return $userStore.login({...login}).then(() => {
                window.location.reload()
            }).catch(err => {
                const errors = {
                    // foo: 'error', is also supported
                    ...err.response.data
                    }
                $externalResults.value = errors
                loading.value = false
            })
        }
       
    }

    const rules = {
        email: {required, email},
        password: {required}
    }

    const $v = useVuelidate(rules, login, {$externalResults})

    return { login, signIn, $v, loading }
}