import{_ as I,r as g,o as d,c as r,F as p,d as e,f as v,g as V,t as c,a as n,w as k,b as C,h as y,v as P,i as b,j as S}from"./index-cba797ed.js";const{VITE_APP_URL:m,VITE_APP_PATH:u}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"cream21",BASE_URL:"/vite_week_6/",MODE:"production",DEV:!1,PROD:!0},E={data(){return{cart:[],loadingItem:"",cartStatus:!1,form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{onSubmit(){console.log(this.form)},isPhone(t){return/^(09)[0-9]{8}$/.test(t)?!0:"需為正確的手機號碼格式"},getCarts(){this.$http.get(`${m}/v2/api/${u}/cart`).then(t=>{console.log("取得購物車",t.data.data),this.cart=t.data.data,t.data.data.carts.length?this.cartStatus=!0:this.cartStatus=!1}).catch(t=>{alert(t.data)})},updateCartItem(t){const s={product_id:t.product.id,qty:t.qty};this.loadingItem=t.id,this.$http.put(`${m}/v2/api/${u}/cart/${t.id}`,{data:s}).then(h=>{console.log("更新購物車",h.data),this.getCarts(),this.loadingItem=""}).catch(h=>{alert(h.data.message)})},deleteCartItem(t){this.loadingItem=t.id,this.$http.delete(`${m}/v2/api/${u}/cart/${t.id}`).then(s=>{console.log("刪除購物車品項",s.data),this.getCarts(),this.loadingItem=""})},deleteCarts(){this.$http.delete(`${m}/v2/api/${u}/carts`).then(t=>{console.log(t.data.message),this.cartStatus=!1,this.getCarts()}).catch(t=>{alert(t.data)})},createOrder(){const t=this.form;this.$http.post(`${m}/v2/api/${u}/order`,{data:t}).then(s=>{alert(s.data.message),this.$refs.form.resetForm(),this.form.message="",this.getCarts()}).catch(s=>{console.log(s.data)})}},mounted(){this.getCarts()}},U={key:0,class:"text-center"},w=e("p",null,"目前購物車沒有任何商品",-1),T=[w],q={class:"text-end"},A={class:"table align-middle"},N=e("thead",null,[e("tr",null,[e("th"),e("th",null,"品名"),e("th",{style:{width:"150px"}},"數量/單位"),e("th",null,"單價")])],-1),D=["onClick","disabled"],B=["disabled"],L={class:"input-group input-group-sm"},O=["onUpdate:modelValue","onChange","disabled"],R=["value"],F={class:"text-end"},M=e("td",{colspan:"3",class:"text-end"},"總計",-1),j={class:"text-end"},H=e("hr",null,null,-1),z={class:"my-5 row justify-content-center"},$={class:"mb-3"},G=e("label",{for:"email",class:"form-label"},"Email",-1),J={class:"mb-3"},K=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),Q={class:"mb-3"},W=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),X={class:"mb-3"},Y=e("label",{for:"address",class:"form-label"},"收件人地址",-1),Z={class:"mb-3"},ee=e("label",{for:"message",class:"form-label"},"留言",-1),te=e("div",{class:"text-end"},[e("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function se(t,s,h,le,a,i){const _=g("v-field"),f=g("error-message"),x=g("v-form");return d(),r(p,null,[a.cartStatus?(d(),r(p,{key:1},[e("div",q,[e("button",{class:"btn btn-outline-danger",type:"button",onClick:s[0]||(s[0]=(...l)=>i.deleteCarts&&i.deleteCarts(...l))}," 清空購物車 ")]),e("table",A,[N,e("tbody",null,[a.cart.carts?(d(!0),r(p,{key:0},v(a.cart.carts,l=>(d(),r("tr",{key:l.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:o=>i.deleteCartItem(l),disabled:l.id===a.loadingItem},[l.id===a.loadingItem?(d(),r("i",{key:0,class:"fas fa-spinner fa-pulse",disabled:l.id===a.loadingItem},null,8,B)):V("",!0),C(" x ")],8,D)]),e("td",null,c(l.product.title)+" ",1),e("td",null,[e("div",L,[y(e("select",{name:"",id:"",class:"form-control","onUpdate:modelValue":o=>l.qty=o,onChange:o=>i.updateCartItem(l),disabled:l.id===a.loadingItem},[(d(),r(p,null,v(20,o=>e("option",{value:o,key:o+"12345"},c(o),9,R)),64))],40,O),[[P,l.qty]])])]),e("td",F,c(l.product.price),1)]))),128)):V("",!0)]),e("tfoot",null,[e("tr",null,[M,e("td",j,c(a.cart.total),1)])])])],64)):(d(),r("div",U,T)),H,e("div",z,[n(x,{ref:"form",class:"col-md-6",onSubmit:i.createOrder},{default:k(({errors:l})=>[C(c(l)+" ",1),e("div",$,[G,n(_,{id:"email",name:"email",type:"email",class:b(["form-control",{"is-invalid":l.email}]),rules:"email|required",placeholder:"請輸入 Email",modelValue:a.form.user.email,"onUpdate:modelValue":s[1]||(s[1]=o=>a.form.user.email=o)},null,8,["class","modelValue"]),n(f,{name:"email",class:"invalid-feedback"})]),e("div",J,[K,n(_,{id:"name",name:"姓名",type:"text",class:b(["form-control",{"is-invalid":l.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:a.form.user.name,"onUpdate:modelValue":s[2]||(s[2]=o=>a.form.user.name=o)},null,8,["class","modelValue"]),n(f,{name:"姓名",class:"invalid-feedback"})]),e("div",Q,[W,n(_,{id:"tel",name:"電話",type:"text",class:b(["form-control",{"is-invalid":l.電話}]),placeholder:"請輸入電話",rules:i.isPhone,modelValue:a.form.user.tel,"onUpdate:modelValue":s[3]||(s[3]=o=>a.form.user.tel=o)},null,8,["class","rules","modelValue"]),n(f,{name:"電話",class:"invalid-feedback"})]),e("div",X,[Y,n(_,{id:"address",name:"地址",type:"text",class:b(["form-control",{"is-invalid":l.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:a.form.user.address,"onUpdate:modelValue":s[4]||(s[4]=o=>a.form.user.address=o)},null,8,["class","modelValue"]),n(f,{name:"地址",class:"invalid-feedback"})]),e("div",Z,[ee,y(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":s[5]||(s[5]=o=>a.form.message=o)},null,512),[[S,a.form.message]])]),te]),_:1},8,["onSubmit"])])],64)}const oe=I(E,[["render",se]]);export{oe as default};
