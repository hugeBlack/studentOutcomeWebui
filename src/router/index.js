import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import("@/pages/LoginPage.vue"),
            children: [
                {
                    path: "",
                    name: "loginView",
                    component: () => import("@/views/miscellany/LoginView.vue"),
                },

            ]
        },
        {
            path: '/',
            name: 'home',
            component: () => import("@/pages/HomePage.vue"),
            children: [
                {
                    path: "",
                    name: "homeView",
                    component: () => import("@/views/miscellany/HomeView.vue"),
                },
                {
                    path: "user",
                    name: "userView",
                    component: () => import("@/views/miscellany/UserView.vue"),
                },
                {
                    path: "userManagement",
                    name: "manageUserView",
                    component: ()=>import("@/views/miscellany/UserManagementView.vue"),
                },
                {
                    path: "competition",
                    name: "competitionSeries",
                    children: [
                        {
                            path: "",
                            name: "competitionHomeView",
                            component: () => import("@/views/competition/CompetitionView.vue"),
                        },
                        {
                            path: "edit/:teamId",
                            name: "teamEdit",
                            component: () => import("@/views/competition/CompetitionEditView.vue")
                        },
                        {
                            path: "new",
                            name: "teamNew",
                            component: () => import("@/views/competition/CompetitionEditView.vue")
                        },
                        {
                            path: "view/:teamId",
                            name: "teamView",
                            component: () => import("@/views/competition/CompetitionViewView.vue")
                        }

                    ]
                },
                {
                    path: "competitionCheck",
                    name: "competitionCheckSeries",
                    children: [
                        {
                            path: "",
                            name: "competitionCheckHomeView",
                            component: () => import("@/views/competition/CompetitionCheckListView.vue"),
                        },
                        {
                            path: ":teamId",
                            name: "teamCheck",
                            component: () => import("@/views/competition/CompetitionCheckView.vue")
                        },

                    ]
                }, 
                {
                    path: "patentCheck",
                    name: "patentCheckView",
                    children: [
                        {
                            path: "",
                            name: "patentCheckHomeView",
                            component: () => import("@/views/patent/PatentCheckListView.vue"),
                        },
                        {
                            path: ":id",
                            name: "patentCheck",
                            component: () => import("@/views/patent/PatentCheckView.vue")
                        },

                    ]
                },
                {
                    path: "paperCheck",
                    name: "paperCheckView",
                    children: [
                        {
                            path: "",
                            name: "paperCheckHomeView",
                            component: () => import("@/views/paper/PaperCheckListView.vue"),
                        },
                        {
                            path: ":id",
                            name: "paperCheck",
                            component: () => import("@/views/paper/PaperCheckView.vue")
                        },

                    ]
                },
                {
                    path: "volunteer",
                    name: "volunteerSeries",
                    children: [
                        {
                            path: "",
                            name: "volunteersView",
                            component: () => import("@/views/volunteer/showVolunteers.vue"),
                        },
                        {
                            path: ":teamId",
                            name: "volunteersDetail",
                            component: () => import("@/views/volunteer/VolunteersView.vue"),
                        }
                    ]
                },
                {
                    path: "volunteerCheck",
                    name: "volunteerCheckView",
                    children: [
                        {
                            path: "",
                            name: "volunteerCheckHomeView",
                            component: () => import("@/views/volunteer/VolunteerCheckListView.vue"),
                        },
                        {
                            path: ":id",
                            name: "volunteerCheck",
                            component: () => import("@/views/volunteer/VolunteerCheckView.vue")
                        },

                    ]
                },
                {
                    path: "competitionManage",
                    name: "competitionManage",
                    component: () => import("@/views/competition/CompetitionManagementView.vue")
                },
                {
                    name: "paperSeries",
                    path: "paper",
                    children: [
                        {
                            path: ":teamId",
                            name: "paperView",
                            component: () => import("@/views/paper/PaperView.vue"),
                        },
                        {
                            path: "",
                            name: "ChangePaperwork",
                            component: () => import("@/views/paper/StudentPaperListView.vue"),
                        },
                    ]
                },

                {
                    path: "patent",
                    name: "patentView",
                    component: () => import("@/views/patent/showPatentpage.vue"),
                },
                {
                    path: "patentDetail/:teamId",
                    name: "patentDetail",
                    component: () => import("@/views/patent/PatentView.vue"),
                },

                {
                    path: "socialWork",
                    name: "socialWork",
                    component: () => import("@/views/social/showSocialWork.vue"),
                },
                {
                    path: "socialDetail/:teamId",
                    name: "socialDetail",
                    component: () => import("@/views/social/SocialWork.vue"),
                },
                {
                    path: "reviewSocialwork/:Id",
                    name: "reviewSocialwork",
                    component: () => import("@/views/social/reviewSocialwork.vue"),
                 
                },
                {
                    path: "SocialCheckListView",
                    name: "SocialCheckListView",
                    component: () => import("@/views/social/SocialCheckListView.vue"),
                 
                },
                {
                    path: "ticket",
                    name: "ticket",
                    children: [
                        {
                            path: "",
                            name: "ticketHomeView",
                            component: () => import("@/views/ticket/TicketHome.vue"),
                        },
                        {
                            path: "view/:ticketId",
                            name: "ticketView",
                            component: () => import("@/views/ticket/TicketView.vue")
                        },
                        {
                            path: "viewAdmin/:ticketId",
                            name: "ticketViewAdmin",
                            component: () => import("@/views/ticket/TicketViewAdmin.vue")
                        }]
                },
                {
                    path: "reviewTicket",
                    name: "reviewTicket",
                    component: () => import("@/views/ticket/ReviewTicket.vue")
                },
                {
                    path: "notice",
                    name: "notice",
                    component: () => import("@/views/notice/SendNotice.vue")
                },
                {
                    path: "export",
                    name: "export",
                    component: () => import("@/views/miscellany/ExportView.vue")
                }
            ]
        },

        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/pages/ErrorPage.vue") },
    ]
})

export default router
