"use strict";(self["webpackChunkvue2_pbstar_admin"]=self["webpackChunkvue2_pbstar_admin"]||[]).push([[529],{5529:function(t,e,i){i.r(e),i.d(e,{default:function(){return C}});var o=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"box"},[e("div",{staticClass:"boxs"},[e("div",{staticClass:"verificationCodeBox"},[e("verificationCode",{ref:"verificationCode1"}),e("el-button",{attrs:{type:"text"},on:{click:t.toUpdate1}},[t._v("看不清")])],1),e("p",[t._v("文字验证码")])]),e("div",{staticClass:"boxs"},[e("div",{staticClass:"verificationCodeBox"},[e("verificationCode",{ref:"verificationCode2",attrs:{type:"2",contentWidth:120,identifyCodes:"123456789"},on:{changeCode:t.changeCode2}}),e("el-button",{attrs:{type:"text"},on:{click:t.toUpdate2}},[t._v("看不清")])],1),e("p",[t._v("计算验证码")])])])])},n=[],a=function(){var t=this,e=t._self._c;return e("div",[e("span",{staticClass:"s-canvas",on:{click:t.changeCode}},[e("canvas",{ref:"canvasBox",attrs:{width:t.contentWidth,height:t.contentHeight}})])])},d=[],s={name:"verificationCode",data(){return{identifyCode:""}},props:{type:{type:String,default:"1"},identifyCodes:{type:String,default:"1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"},fontSizeMin:{type:Number,default:25},fontSizeMax:{type:Number,default:35},backgroundColorMin:{type:Number,default:200},backgroundColorMax:{type:Number,default:220},dotColorMin:{type:Number,default:60},dotColorMax:{type:Number,default:120},contentWidth:{type:Number,default:100},contentHeight:{type:Number,default:44}},watch:{identifyCode(){this.drawPic()}},mounted(){this.drawPic(),this.changeCode()},methods:{randomNum(t,e){return Math.floor(Math.random()*(e-t)+t)},randomColor(t,e){let i=this.randomNum(t,e),o=this.randomNum(t,e),n=this.randomNum(t,e);return"rgb("+i+","+o+","+n+")"},drawPic(){let t=this.$refs.canvasBox,e=t.getContext("2d");e.textBaseline="bottom",e.fillStyle=this.randomColor(this.backgroundColorMin,this.backgroundColorMax),e.fillRect(0,0,this.contentWidth,this.contentHeight);for(let i=0;i<this.identifyCode.length;i++)this.drawText(e,this.identifyCode[i],i);this.drawLine(e),this.drawDot(e)},drawText(t,e,i){t.fillStyle=this.randomColor(50,160),t.font=this.randomNum(this.fontSizeMin,this.fontSizeMax)+"px SimHei";let o=(i+1)*((this.contentWidth-10)/(this.identifyCode.length+1)),n=this.randomNum(this.fontSizeMax,this.contentHeight-5);var a=this.randomNum(-30,30);t.translate(o,n),(1!=i&&3!=i||2!=this.type)&&t.rotate(a*Math.PI/180),t.fillText(e,0,0),(1!=i&&3!=i||2!=this.type)&&t.rotate(-a*Math.PI/180),t.translate(-o,-n)},drawLine(t){for(let e=0;e<4;e++)t.strokeStyle=this.randomColor(100,200),t.beginPath(),t.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight)),t.stroke()},drawDot(t){for(let e=0;e<30;e++)t.fillStyle=this.randomColor(0,255),t.beginPath(),t.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI),t.fill()},changeCode(){this.identifyCode="",this.makeCode(this.identifyCodes,4)},makeCode(t,e){if(1==this.type){for(let i=0;i<e;i++)this.identifyCode+=t[this.randomNum(0,t.length)];this.$emit("changeCode",this.identifyCode)}else if(2==this.type){let e=t[this.randomNum(0,t.length)],i=t[this.randomNum(0,t.length)];this.identifyCode+=e,this.identifyCode+="+",this.identifyCode+=i,this.identifyCode+="=?",this.$emit("changeCode",Number(e)+Number(i))}else console.error("验证码类型错误")}}},r=s,h=i(1001),l=(0,h.Z)(r,a,d,!1,null,"c0167762",null),c=l.exports,f={name:"adminModuleVerificationCode",components:{verificationCode:c},data(){return{list:[]}},methods:{changeCode2(t){console.log(t)},toUpdate1(){this.$refs.verificationCode1.changeCode()},toUpdate2(){this.$refs.verificationCode2.changeCode()}}},u=f,m=(0,h.Z)(u,o,n,!1,null,"2c63ac88",null),C=m.exports}}]);