<script setup>

import LinkButtonWithIcon from "@/components/LinkButtonWithIcon.vue";
import { changeTheme } from "@/assets/changeTheme";
import router from "@/router";
import loginApi from "@/api/login";
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import globalData from "@/global/global"
import { ElMenuItem, ElSubMenu } from "element-plus";
import NotificationPopup from "@/components/NotificationPopup.vue";

function loginButtonClicked() {
    router.push("/login")
}

const menuItemClick = (ke) => {
    router.push(ke.index)
}

const exitButtonClicked = async () => {
    await loginApi.logout();
    window.location.href = "/";
}

const notificationBox = ref();
const notificationButtonClicked = () => {
    userInfo.data.unread_notification = false;
}

const updateNotifications = () => {
    notificationBox.value.getNotification();
}

const avatarClicked = () => {
    if (!isLogin.value) {
        router.push("/login")
    }
}

const menus = reactive({
    v: [
        { "title": "首页", "icon": "fi-rr-home", "path": "/" },
    ]
});

let userInfo = reactive({
    data: {
        user_phone: "",
        user_name: "未登录",
        user_id: 123456,
        user_group: "none",
        avatar_url: "/webstatic/defaultAvatar.png",
        unread_notification: false,
        verified: false
    }

});

const isLogin = ref(false);
const loadComplete = ref(true);
const gotUserInfo = ref(false)

loginApi.getUserInfo().then(response => {
    let responseObj = response.json
    isLogin.value = true;
    gotUserInfo.value = true

    switch (responseObj.group_id) {
        case 2:
            menus.v = [
                { "title": "首页", "icon": "fi-rr-home", "path": "/" },
                { "title": "竞赛填报", "icon": "fi-rr-trophy", "path": "/competition" },
                { "title": "论文填报", "icon": "fi-rr-scroll", "path": "/paper" },
                { "title": "专利填报", "icon": "fi-rr-bulb", "path": "/patent" },
                { "title": "志愿服务", "icon": "fi-rr-room-service", "path": "/volunteer" },
                { "title": "社会活动", "icon": "fi-rr-users", "path": "/socialWork" },
                { "title": "工单填写", "icon": "fi-rr-edit", "path": "/ticket" },
                { "title": "修改密码", "icon": "fi-rr-key", "path": "/user" },
            ]
            break;
        case 3:
            menus.v = [

                { "title": "首页", "icon": "fi-rr-home", "path": "/" },
                { "title": "审核参赛信息", "icon": "fi-rr-trophy", "path": "/competitionCheck" },
                { "title": "竞赛信息管理", "icon": "fi-rr-trophy", "path": "/competitionManage" },
                { "title": "审核专利信息", "icon": "fi-rr-bulb", "path": "/patentCheck" },
                { "title": "审核社会活动信息", "icon": "fi-rr-users", "path": "/SocialCheckListView" },
                { "title": "审核论文信息", "icon": "fi-rr-scroll", "path": "/paperCheck" },
                { "title": "审核志愿活动信息", "icon": "fi-rr-room-service", "path": "/volunteerCheck" },
                { "title": "发布通知", "icon": "fi-rr-megaphone", "path": "/notice" },
                { "title": "审批工单", "icon": "fi-rr-clipboard", "path": "/reviewTicket" },
                { "title": "用户管理", "icon":"fi-rr-user", "path":"/userManagement"},
                { "title": "表格导出", "icon": "fi-rr-file", "path": "/export"},
                { "title": "修改密码", "icon": "fi-rr-key", "path": "/user" },
            ]
    }
    loadComplete.value = false;
    // 等菜单卸载完了再改回来
    setTimeout(() => {
        loadComplete.value = true
    }, 0)
    globalData.login = true;
    userInfo.data = responseObj
    globalData.userInfo = userInfo.data
}).catch(error => {
    if (error.network) return;
    switch (error.errorCode) {
        case 600:
            router.push("/login")
            break;
        default:
            error.defaultHandler()
    }
})


const getSidebarPath = () => {
    let path = router.currentRoute.value.path.split("/")
    if (path.length === 1) {
        return ""
    } else {
        return "/" + path[1];
    }


}

const menu = ref();
let contentDom = undefined;
onMounted(() => {
    (() => {
        let menuItemNow = getSidebarPath();
        for (let item of menus.v) {
            if (!item.children) continue;
            for (let child of item.children) {
                if (child.path === menuItemNow) {
                    menu.value.open(item.path);
                }
            }
        }
        contentDom = document.querySelector(".content")
    })()
})


watch(router.currentRoute, () => {
    contentDom.scrollTo({ left: 0, top: 0 })
})

</script>

<template>
    <div class="pageWrapper">
        <div class="headerHolder">
            <div class="leftTitle">
                <!--                <img alt="" src="../assets/logo.png">-->
                学生成果填报系统
            </div>
            <div class="rightTitle" v-if="isLogin">
                <el-popover :width="360"
                    popper-style="box-shadow: 0 5px 20px hsla(0,0%,7%,.1);padding: 0; transition: opacity 0.3s;"
                    trigger="click" @before-enter="updateNotifications">
                    <template #reference>
                        <LinkButtonWithIcon font-color="#fff" text="消息通知" icon="fi-rr-bell"
                            :has-notification="userInfo.data.unread_notification" @click="notificationButtonClicked">
                        </LinkButtonWithIcon>
                    </template>
                    <template #default>
                        <NotificationPopup ref="notificationBox"></NotificationPopup>
                    </template>
                </el-popover>

                <div class="line">
                </div>
                <LinkButtonWithIcon font-color="#fff" text="退出" icon="" @click="exitButtonClicked"></LinkButtonWithIcon>
            </div>
            <div class="rightTitle" v-if="!isLogin">

                <LinkButtonWithIcon font-color="#fff" text="点击登录" icon="" @click="loginButtonClicked"></LinkButtonWithIcon>
            </div>
        </div>
        <div class="contentHolder">
            <div class="sideBar">
                <div class="userInfoWrapper">
                    <UserInfoCard :user-info="userInfo.data" showAvatarBorder @click="avatarClicked"></UserInfoCard>
                </div>


                <el-menu v-if="loadComplete" :default-active="getSidebarPath()" class="sideBarMenu" ref="menu">
                    <component v-for="item in menus.v" :is="item.children ? ElSubMenu : ElMenuItem" :index="item.path"
                        v-on="item.children ? {} : { click: menuItemClick }">
                        <template #title>
                            <i class="fi" :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item v-if="item.children" v-for="child in item.children" :index="child.path"
                            @click="menuItemClick">
                            <i class="fi" :class="child.icon"></i>
                            <span>{{ child.title }}</span>
                        </el-menu-item>
                    </component>
                </el-menu>
            </div>

            <div class="content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>


<style scoped>
.headerHolder {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background-color: var(--el-color-primary);
    display: flex;
    justify-content: space-between;
    max-height: 50px;
    flex: 1;
}

.headerHolder>div {
    display: flex;
    align-items: center;
    margin: 0 20px;
}

.pageWrapper {
    height: 100vh;
    width: 100%;
    min-width: 1200px;
    max-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.leftTitle img {
    max-height: 50px;
    margin-right: 20px;
}

.rightTitle img {
    height: 60px;
}

.rightTitle>* {
    margin: 0 10px;
}

.line {
    border-left: #fff 1px solid;
    height: 1em;
    width: 1px;
    margin: 0 5px;
}

.contentHolder {
    display: flex;
    justify-items: stretch;
    flex: 3;
    overflow: hidden;

}


.content {
    overflow-y: auto;
    background-color: var(--el-color-primary-light-9);
    flex: 1;
}

.sideBar {
    width: 230px;
    min-width: 230px;
    max-width: 230px;
    flex: 3;
}

.sideBar .sideBarMenu {
    border-right: none;
}

.sideBar .sideBarMenu i {
    margin-right: 10px;
    font-size: 1.1em;
}

.userInfoWrapper {
    padding: 10px 20px;
    border-bottom: 1px #eee solid;
}

.leftTitle {
    color: #fff;
}
</style>