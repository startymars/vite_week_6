import{_ as d,o as c,c as m,d as e,h as i,i as l}from"./index-16e104e8.js";const{VITE_APP_URL:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"cream21",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},u={data(){return{temp:{username:"",password:""}}},methods:{login(){this.$http.post(`${p}/v2/admin/signin`,this.temp).then(o=>{const{token:s,expired:r}=o.data;console.log(s,r),document.cookie=`week2Token=${s};expires=${new Date(r)};`,this.$router.push("/admin")}).catch(o=>{console.dir(o),alert(o.response.data.message)})}}},_={class:"container"},f={class:"row justify-content-center"},h={class:"col-8"},w={id:"form",class:"form-signin"},g={class:"form-floating mb-3"},P=e("label",{for:"username"},"Email address",-1),v={class:"form-floating"},b=e("label",{for:"password"},"Password",-1);function x(o,s,r,E,n,a){return c(),m("div",_,[e("div",f,[e("div",h,[e("form",w,[e("div",g,[i(e("input",{type:"email",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=t=>n.temp.username=t),id:"username",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[l,n.temp.username]]),P]),e("div",v,[i(e("input",{type:"password",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=t=>n.temp.password=t),id:"password",placeholder:"Password",required:""},null,512),[[l,n.temp.password]]),b]),e("button",{class:"btn btn-lg btn-primary w-100 mt-3",onClick:s[2]||(s[2]=(...t)=>a.login&&a.login(...t)),type:"button"}," 登入 ")])])])])}const k=d(u,[["render",x]]);export{k as default};