<template>
    <el-form
        :label-position="'top'"
        label-width="60px"
        :model="loginCredential"
        class="loginForm"
    >
        <div class="titleWrapper">
            <div class="loginTitle">登录</div>
        </div>

        <el-form-item label="学号" v-bind:class="{ error: isError }">
            <el-input v-model="loginCredential.studentId" @click="clearErrorBorder" :disabled="locked"/>
        </el-form-item>
        <el-form-item label="密码" v-bind:class="{ error: isError }">
            <el-input v-model="loginCredential.password" type="password" @click="clearErrorBorder" show-password :disabled="locked"/>
        </el-form-item>
        <div class="errorText">{{errorMsg}}</div>

        <div class="loginButtonHolder">
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </div>
    </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue'
import router from "@/router";
import loginApi from "@/api/login";


const loginCredential = reactive({
    studentId: '',
    password: '',
})
const locked = ref(false)

const errorMsg = ref('')
const isError = ref(false)
const onSubmit = () => {
    errorMsg.value = "";
    isError.value = false;

    if(loginCredential.studentId===''){
        errorMsg.value = "请输入学号！"
        isError.value = true
        return
    }
    loginApi.login(loginCredential.studentId, loginCredential.password).then(response => {
        isError.value = false;
        errorMsg.value = ''
        router.push("/")
    }).catch(error => {
        if(error.network) return;
        switch(error.errorCode){
            case 601:
                errorMsg.value = "用户名或密码错误";
                isError.value = true;
                break;
            default:
                error.defaultHandler()
        }
    })
}



const clearErrorBorder = () =>{
    isError.value = false;
}

</script>

<style scoped>

.demo-form-inline .el-input {
    --el-input-width: 220px;
}


.titleWrapper{
    text-align: center;
    margin-bottom:  30px;
    position: relative;
}

.loginTitle{
    font-size: 30px;
    color: var(--el-color-primary);
    font-weight: bold;
    margin-bottom: 5px;
}

.loginSubTitle{
    color: var(--el-color-primary);
}

.loginForm{
    width: 250px;
    height: 80%;
}

.textButtonHolder{
    text-align: right;
    margin-bottom: 20px;
}

.loginButtonHolder{
    width: 100%;
    text-align: center;
}

.loginButtonHolder>button{
    height: 40px;
    width: 60%;
}
.errorText{
    font-size: 10px;
    height: 0;
    width: 100%;
    color: var(--el-color-error);
    transform: translateY(-15px);
}

.error .el-input{
    --el-input-border-color:var(--el-color-error)

}
</style>