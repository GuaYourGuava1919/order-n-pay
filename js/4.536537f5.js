(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{5840:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return"admin"==t.currentUserInfo.auth?e("div",{staticClass:"q-pa-md q-ma-sm"},[e("div",{staticClass:"flex item-center text-primary q-py-md"},[e("q-icon",{attrs:{name:"manage_accounts",size:"30px"}}),e("div",{staticClass:"text-h6 text-weight-bold"},[t._v("管理員控制板")])],1),e("div",{},[e("q-form",{staticClass:"q-gutter-sm",on:{submit:t.createRes,reset:t.onReset}},[e("div",{staticClass:"text-h7 q-py-md text-weight-bold"},[t._v("餐廳資訊管理")]),e("q-input",{attrs:{filled:"",label:"輸入餐廳名稱","lazy-rules":"",rules:[t=>t&&t.length>0||"必填"]},model:{value:t.restaurant.name,callback:function(e){t.$set(t.restaurant,"name",e)},expression:"restaurant.name"}}),e("q-input",{attrs:{filled:"",label:"輸入營業時間","lazy-rules":"","hide-bottom-space":"",rules:[t=>t&&t.length>0||"必填"]},model:{value:t.restaurant.operatingHours,callback:function(e){t.$set(t.restaurant,"operatingHours",e)},expression:"restaurant.operatingHours"}}),e("q-select",{attrs:{options:t.options,label:"訂餐方式"},model:{value:t.restaurant.order,callback:function(e){t.$set(t.restaurant,"order",e)},expression:"restaurant.order"}}),"電話號碼"===t.restaurant.order?e("q-input",{attrs:{filled:"",label:"輸入電話號碼","lazy-rules":"","hide-bottom-space":"",rules:[t=>t&&t.length>0||"必填"]},model:{value:t.restaurant.phoneNum,callback:function(e){t.$set(t.restaurant,"phoneNum",e)},expression:"restaurant.phoneNum"}}):t._e(),"訂餐網址"===t.restaurant.order?e("q-input",{attrs:{filled:"",label:"輸入訂餐網址","lazy-rules":"","hide-bottom-space":"",rules:[t=>t&&t.length>0||"必填"]},model:{value:t.restaurant.url,callback:function(e){t.$set(t.restaurant,"url",e)},expression:"restaurant.url"}}):t._e(),e("div",{staticClass:"q-py-md",attrs:{align:"right"}},[e("q-btn",{staticClass:"q-ml-sm",attrs:{label:"清空",type:"reset",color:"primary",flat:""}}),e("q-btn",{attrs:{label:"送出",type:"submit",color:"primary",rounded:"",push:""}})],1)],1)],1),e("div",{staticClass:"q-py-md"},[e("div",{staticClass:"text-h7 q-ma-sm text-weight-bold"},[t._v("重置餐廳得票數")]),e("q-btn",{staticStyle:{width:"100%"},attrs:{label:"重置",color:"secondary",push:""},on:{click:function(e){t.confirm=!0}}}),e("q-dialog",{model:{value:t.confirm,callback:function(e){t.confirm=e},expression:"confirm"}},[e("q-card",[e("q-card-section",[e("div",{staticClass:"text-h6"},[t._v("確定重置【餐廳得票數】？")])]),e("q-card-section",{staticClass:"q-pt-none"},[e("div",{staticClass:"text-subtitle2"},[t._v("重置後將無法回復，請確認是否要重置")])]),e("q-card-actions",{attrs:{align:"right"}},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{push:"",rounded:"",label:"確定",color:"primary"},on:{click:t.resetVote}})],1)],1)],1)],1),e("div",{staticClass:"q-py-md"},[e("div",{staticClass:"text-h7 q-ma-sm text-weight-bold"},[t._v("重置使用者投票權")]),e("q-btn",{staticStyle:{width:"100%"},attrs:{label:"重置",color:"secondary",push:""},on:{click:function(e){t.confirm2=!0}}}),e("q-dialog",{model:{value:t.confirm2,callback:function(e){t.confirm2=e},expression:"confirm2"}},[e("q-card",[e("q-card-section",[e("div",{staticClass:"text-h6"},[t._v("確定重置【使用者投票權】？")])]),e("q-card-section",{staticClass:"q-pt-none"},[e("div",{staticClass:"text-subtitle2"},[t._v("重置後將無法回復，請確認是否要重置")])]),e("q-card-actions",{attrs:{align:"right"}},[e("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{push:"",rounded:"",label:"確定",color:"primary"},on:{click:t.resetUserRight}})],1)],1)],1)],1)]):e("div",{staticClass:"flex justify-center"},[t._m(0),e("q-btn",{staticClass:"q-ma-md",attrs:{label:"回首頁",color:"primary",push:""},on:{click:t.goto}})],1)},r=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"q-pa-md q-ma-md flex justify-center"},[e("div",{staticClass:"text-h6 q-ma-md text-negative text-weight-bold"},[t._v("\n      你不是管理員無法進入此頁面\n    ")]),e("img",{attrs:{src:"https://t3.ftcdn.net/jpg/05/22/78/10/360_F_522781059_PkLOlI2Oa5JLqegwCBpUBK0nDWrwUam2.jpg",alt:"",width:"200"}})])}],o=(a("14d9"),a("1494")),n=a("9696"),i={name:"ManagerZone",data(){return{restaurant:{NoV:0,orderCount:0,phoneNum:"",url:""},options:["電話號碼","訂餐網址"],confirm:!1,confirm2:!1}},computed:{currentUserInfo(){return this.$store.state.currentUserInfo}},methods:{onSubmit(){console.log("submit")},onReset(){this.restaurant={NoV:0,orderCount:0}},async createRes(){try{const t=Object(o["f"])(n["a"]),e=await Object(o["a"])(Object(o["b"])(t,"restaurant"),{name:this.restaurant.name,operatingHours:this.restaurant.operatingHours,phoneNum:this.restaurant.phoneNum,url:this.restaurant.url,NoV:this.restaurant.NoV,orderCount:this.restaurant.orderCount});console.log("新增餐廳資訊成功",e),this.$q.notify({color:"secondary",message:"新增餐廳成功",icon:"restart_alt"}),this.onReset()}catch(t){console.log("新增餐廳資訊失敗",t)}},async resetVote(){try{const t=Object(o["f"])(n["a"]),e=Object(o["b"])(t,"restaurant"),a=await Object(o["e"])(e);a.forEach((e=>{const a=Object(o["c"])(t,"restaurant",e.id);Object(o["h"])(a,{NoV:0,orderCount:0})})),this.$q.notify({color:"info",message:"重置票數成功",icon:"restart_alt"})}catch(t){console.log("重置失敗",t)}},async resetUserRight(){try{const t=Object(o["f"])(n["a"]),e=Object(o["b"])(t,"user"),a=await Object(o["e"])(e);a.forEach((e=>{const a=Object(o["c"])(t,"user",e.id);Object(o["h"])(a,{voteRight:!0,voteTo:""})})),this.$q.notify({color:"info",message:"重置投票權成功",icon:"restart_alt"})}catch(t){console.log("重置失敗",t)}},goto(){"/"!=this.$route.path&&this.$router.push("/")}},mounted(){}},c=i,l=(a("76e6"),a("2877")),u=a("0016"),d=a("0378"),p=a("27f9"),m=a("ddd8"),b=a("9c40"),h=a("24e8"),f=a("f09f"),g=a("a370"),q=a("4b7e"),v=a("7f67"),y=a("eebe"),C=a.n(y),x=Object(l["a"])(c,s,r,!1,null,"bbf6a0a8",null);e["default"]=x.exports;C()(x,"components",{QIcon:u["a"],QForm:d["a"],QInput:p["a"],QSelect:m["a"],QBtn:b["a"],QDialog:h["a"],QCard:f["a"],QCardSection:g["a"],QCardActions:q["a"]}),C()(x,"directives",{ClosePopup:v["a"]})},"5d8d":function(t,e,a){},"76e6":function(t,e,a){"use strict";a("5d8d")},9696:function(t,e,a){"use strict";var s=a("bc7b"),r=a("1902");const o={apiKey:"AIzaSyCBtwlgaAmqFR9rpQ-b6chUDV-6QGaNdnQ",authDomain:"order-n-pay.firebaseapp.com",projectId:"order-n-pay",storageBucket:"order-n-pay.appspot.com",messagingSenderId:"198387957066",appId:"1:198387957066:web:37cd03ae01e54e79be55b3",measurementId:"G-4QG8HNSB8D"},n=Object(s["a"])(o);Object(r["a"])(n);e["a"]=n}}]);