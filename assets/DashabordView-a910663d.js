import{_ as l,R as h,r as i,o as _,c as p,a as t,w as n,b as o,d as r,F as m}from"./index-16e104e8.js";const{VITE_APP_URL:k}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"cream21",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},f={methods:{logout(){document.cookie=`week2Token=;expires=${new Date};`,this.$router.push("/")},checkLogin(){const c=document.cookie.replace(/(?:(?:^|.*;\s*)week2Token\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=c,this.$http.post(`${k}/v2/api/user/check`).then(e=>{e.data.success||this.$router.push("/login")}).catch(e=>{console.dir(e),this.$router.push("/login")})}},mounted(){this.checkLogin()},components:{RouterView:h}},$=r("p",null,"這是後台頁面唷",-1),V=r("hr",null,null,-1);function w(c,e,P,g,R,a){const s=i("router-link"),u=i("RouterView");return _(),p(m,null,[$,t(s,{to:"/"},{default:n(()=>[o("回前台")]),_:1}),o("| "),t(s,{to:"/admin/adminOrder"},{default:n(()=>[o("後台訂單列表")]),_:1}),o("| "),t(s,{to:"/admin/adminProducts"},{default:n(()=>[o("後台產品列表")]),_:1}),o("| "),r("a",{href:"#",onClick:e[0]||(e[0]=(...d)=>a.logout&&a.logout(...d))},"登出"),V,t(u)],64)}const E=l(f,[["render",w]]);export{E as default};
