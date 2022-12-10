import { computed, reactive, ref } from "vue"
import userStore from "../store/user";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useRouter } from "vue-router";

export default () => {
    const $userStore = userStore();
    const register = reactive({
        name: 'Joshua Sotto',
        email: 'joshuasotto@example.example',
        password: 'joshuasotto',
        password_confirmation: 'joshuasotto',
    })
    const router = useRouter()
    const $externalResults = ref({})
    const loading = ref(false)
    const rules = computed(() => ({
        email: {required, email},
        name: {required},
        password: {required, min: minLength(8)},
        password_confirmation: {required, same: sameAs(register.password, 'password')},
    }))

    const signUp = () => {
       $v.value.$touch();
       if(!$v.value.$invalid){
        loading.value = true
        $userStore.register({...register}).then(() => {
            window.location.reload()
        }).catch((err) => {
            console.log(err.response.data.errors);
            const errors = {
                ...err.response.data.errors
            };
            $externalResults.value = errors
            loading.value= false
        });
       }
    }

    const $v = useVuelidate(rules, register, {$externalResults})

    return {register, signUp, $v, loading}
}