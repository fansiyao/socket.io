<template>
  <div>
    <nav-header @sendMessage="getMessage" @login="getFriends"></nav-header>
    <nav-bread>
      <span>社交管理</span>
    </nav-bread>

    <el-container class="container">
      <el-aside style="width: 20% " class="bg-purple-dark">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item  v-for="(item,index) in friends" :index="index.toString()" @click="get_talk(item,item.userId)">
            <i class="el-icon-mobile-phone"></i>
            <el-badge is-dot class="item">
              {{item.userName}}
            </el-badge>

          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main  style="position: relative;width: 80%" v-if="checked" v-iscroll="iscrollConf" >
        <div class="content" >
          <div v-for="item in message" class="message-list">
            <div v-if="item.fromId==checked.userId" style="text-align: left">
              <span>{{checked.userName}}:</span>
              <span class="tip">{{item.message}}</span>
            </div>
            <div v-else="" style="text-align: right">
              <span class="tip">{{item.message}}</span>
              <span>:我</span></div>
          </div>


        </div>
        <div style="position: absolute;left: 0;right: 0;bottom: 0">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="talk_text">
              <el-button type="primary" slot="append" @click="send_message">发送</el-button>
            </el-input>
          </div>
          <div data-v-dafbfb34="" class="footer">

            <div data-v-dafbfb34="" class="other">
              <div data-v-dafbfb34="" class="item" v-for="item in iconUrl">
                <img data-v-dafbfb34="" :src="item">
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <form action="/message/upload"  method='post' enctype='multipart/form-data'>
      <input type="file"/>
      <input type="submit"/>
    </form>
    <button @click="changeVuex">改变vuex</button>
    <el-upload
      class="avatar-uploader"
      action="/message/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
     >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
   <!-- <counter ></counter>-->


  </div>
</template>

<script>
  var socket =io.connect('http://127.0.0.1:3000');
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/bread'
  import VIscroll from 'viscroll';


  import Vuex from 'vuex';
  import Vue from 'vue'
  /*Vue.use(Vuex);
  const counter = {
    template:'<div>{{count}}{{userName}}</div>',
    computed:{
      count(){
        return this.$store.state.count

      },
      userName(){
        return this.$store.getters.userName
      }

    }

  };
  const store = new Vuex.Store({
    state:{
      count:0,
      name:'fanfan'
    },
    getters:{
      userName(state){
        return state.name + 'hello'
      }
    },
    mutations:{
      increment(state,num){
        state.count = num;
      }
    },
    actions:{
      incrementAction(context,num){
        context.commit("increment",num)
      }
    }
  });*/
  export default ({
    name:'',
   // store,
    data(){
      return{
        imageUrl: '',
        message:[],
        friends:[],
        talk_text:'',
        checked:null,
        iscrollConf:{
          mouseWheel: true,
          vScrollbar: true,
          click: true,
          preventDefault: true,
          tap: true,
          bounce: false,
          disableTouch: true
        },
        iconName:['ptt','image','ptv','camera','hongbao','flash','emotion','plus']

      }
    },
    computed:{
      iconUrl(){
        return this.iconName.map(item=>require(`@/assets/icon/4/skin_aio_panel_${item}_nor.png`))
      },
    },
    mounted(){

    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
    //  counter
    },
    watch:{
      checked(){
        this.message=this.checked.message;
      }
    },
    methods:{
      get_talk(item,userId){

        this.$http.get('/message/chatting',{
          params:{otherId:userId}
        }).then((res)=>{
          item.message=res.data.result;
          this.checked=item;
        })
      },
      getFriends(){
        this.$http.get('/users/friends').then((res)=>{
          res.data.result.forEach((item)=>{
            item.message=[];
          });
          this.friends=res.data.result
        })
      },
      send_message(){
        var message=this.talk_text;
        this.talk_text="";
        if(!this.checked.userId) return;
        socket.emit('message',{id:this.checked.userId,message:message,sendId:document.cookie.split(";")[0].split("=")[1]} );
        this.saveMessage({fromId:document.cookie.split(";")[0].split("=")[1],toId:this.checked.userId,message:message});
        this.message.push({toId:this.checked.userId,message:message,fromId:document.cookie.split(";")[0].split("=")[1]})
      },
      saveMessage(data){
        this.$http.post('/message/saveChatting',data).then((res)=>{

        })
      },
      getMessage(data){

        var id=data.from_id;
        this.$this.friends.forEach((item)=>{
          if(item==this.checked){
            (item.userId==id)&&(this.message.push({message:data.message,
              name:item.userName,
              fromId:id,
              toId:document.cookie.split(";")[0].split("=")[1]}
              )
            )
          }
        });

      },
      handleAvatarSuccess(res, file) {
        this.$this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      changeVuex(){
       // this.$store.commit("increment")
       // this.$store.dispatch("incrementAction",5);
      }
    }
  })
</script>

<style lang="less">
  .container{
    max-width: 1280px;
    margin: 0 auto;
    height: 700px;


  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    li{
      line-height: 56px;
      border-bottom: 1px solid #c1c0c0;
    }

  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height:700px;
    padding-bottom: 90px;
    overflow: hidden;
    .content{

    //  height: 630px;
    }

  }
  .message-list{
    margin: 5px 0px;
    .tip{
      margin-left: 15px;
      display: inline-block;
      padding: 6px 10px;
      background: #fff;
      border-radius: 5px;
    }
  }
  .footer{
    width:100%;
    bottom:0;
    background:#eee;
    .writeMessage{
      height:32px;
      display:flex;
      textarea{
        width:80%;
        margin:0 6px;
        padding-top:7px;
        padding-left:6px;
        border-radius:2px;
        outline:none;
        resize:none;
        border:none;
        overflow-y:hidden;
        font:16px/18px 'Microsoft Yahei';
      }
      button.btn{
        height:100%;
        width:16%;
        background:#ccc;
        color:white;
        border-radius:2px;
        cursor:not-allowed;
        font-family:'Microsoft Yahei';
        &.enable{
          background:#1E90FF;
          cursor:pointer;
        }
      }
    }
    .other{
      display:flex;
      background:#eee;
      .item{
        height:100%;
        flex:1;
        text-align:center;
        line-height:32px;
        img{
          width:32px;
          height:32px;
          margin-top:4px;
          cursor:pointer;
        }
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
