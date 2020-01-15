export default {
  computed: {
    // 用户信息
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    //未读信息
    unreadMessagesCount() {
      return this.$store.state.user.unreadMessagesCount;
    },
    userImg() {
      return this.$store.state.user.userAvatar;
    },
    userPanData() {
      return this.$store.state.user.userPanData;
    },
    userPhotoData() {
      return this.$store.state.user.userPhotoData;
    },
    userFileData() {
      return this.$store.state.user.userFileData;
    },
    userPayData() {
      return this.$store.state.user.userPayData;
    }
  },
  methods: {
    //toast
    toast(msg) {
      this.wLoading({
        type: 'hide'
      });
      this.$vux.toast.text(msg, 'middle');
    },
    openPop(config) {
      if (config.dom.is(":hidden")) {
        layer.open({
          type: 1,
          title: false,
          closeBtn: config.close || false,
          shadeClose: true,
          skin: config.skin || '',
          content: config.dom,
          area: [config.width || "80%", config.height || ""],
          end: () => {
            config.end ? config.end() : null;
          }
        })
      }
    },
    closePop() {
      layer.closeAll();
    },
    confirm(config) {
      let $confirm = $("#JS_confirm");
      let $body = $("body");
      let title = config.title || "";
      let leftBtnText = config.leftBtnText || "取消";
      let rightBtnText = config.rightBtnText || "确定";
      let confirmClass = config.delete ? 'btn-del-confirm' : 'btn-confirm';
      if ($confirm.length >= 1) {
        $confirm.remove()
      }
      let html = '<div id="JS_confirm" class="w-pop text-center">\
                     <div class="box-bg border-bottom">\
                       <p class="margin-top-10 grays font-32">' + title + '</p>\
                     </div>\
                     <div class="flex flex-around confirm-warpper">\
                       <a class="btn-white btn-mediume" href="javascript:;" id="JS_confirm_left" style="border-bottom-left-radius: 8px;">' + leftBtnText + '</a>\
                       <a class="btn-blue btn-mediume ' + confirmClass + ' " href="javascript:;" id="JS_confirm_right" style="border-bottom-right-radius: 8px;">' + rightBtnText + '</a>\
                     </div>\
                 </div>'
      $body.append(html);
      let $leftBtn = $("#JS_confirm_left");
      let $rightBtn = $("#JS_confirm_right");
      $leftBtn.unbind('click').click(() => {
        if (config.leftCallback) {
          config.leftCallback();
        }
        layer.close(this.confirmLayer);
      })
      $rightBtn.unbind('click').click(() => {
        if (config.rightCallback) {
          config.rightCallback();
        }
        this.closePop(this.confirmLayer);
      })
      this.confirmLayer = layer.open({
        type: 1,
        title: false,
        closeBtn: config.close || false,
        shadeClose: true,
        skin: config.skin || '',
        content: $("#JS_confirm"),
        area: [config.width || "60%", config.height || ""]
      })
    },
    //路由跳转
    jump(to) {
      if (this.$router) {
        layer.closeAll();
        this.$router.push(to);
      }
    },
    hideToTop() {
      setTimeout(() => {
        $(".mescroll-totop").addClass('mescroll-fade-out');
      }, 600);
    },
    //  是否有网络
    isOnline() {
      let networkState = navigator.connection.type;

      let states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      if (states[networkState] == 'No network connection') {
        return false;
      } else {
        return true;
      }
    }, 
    //ajax请求
    GET(config) {
      let api = config.api || '';
      let reqData = config.data || {};
      let isJsonp = config.jsonp || null;
      let myUrl;
      let dataType;
      if (isJsonp) {
        myUrl = 'https://api.bianyue.cn' + config.api;
        dataType = "jsonp";
      } else {
        api = api.substring(1, api.length).replace('?', '&');
        myUrl = 'https://api2.bianyue.cn/oldapi/proxy?c=' + api;
        dataType = "json";
      }
      $.ajax({
        type: "GET",
        url: myUrl,
        data: reqData,
        dataType: dataType,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        xhrFields: {
          withCredentials: true
        },
        success: (data) => {
          this.wLoading({
            type: 'hide'
          });
          if (config.alertErr === 'no_all' && data.status !== 200) {
            config.success ? config.success(data) : null;
          } else if (data.status == '请先登录' || data.code == 401) {
            this.toast('请先登录');
            setTimeout(() => {
              this.jump('/');
            }, 1000);
          } else if (data.status == 200 || config.alertErr === 'no' || data.status == 'card none') {
            config.success ? config.success(data) : null;
          } else {
            if (data.status) {
              this.$vux.toast.show({
                text: data.status,
                type: 'cancel'
              });
            }
          }
        },
        error: (data) => {
          this.wLoading({
            type: 'hide'
          });
          if (data.status == 404) {
            this.$vux.toast.text('加载中，请重试', 'middle');
            config.error ? config.error(data) : null;
            return false;
          }
          this.$vux.toast.text(data.status, 'middle');
          config.error ? config.error(data) : null;
        }
      })
    },
    // 获取用户信息
    getUser(config) {
      let callback = config.callback;
      let alertErr = config.alertErr;
      this.GET({
        api: '/user.php?op=info&action=init',
        alertErr: alertErr,
        success: (data) => {
          if (data.status == '请先登录' && alertErr == 'no_all') {
            callback(data);
            return false;
          }
          let userInfo = data.data;
          let userAvatar = `https://api.bianyue.cn/uploadfile/user_avatar/origin/${userInfo.userid}.jpg?t=${new Date().getTime()}`
          userInfo.qqbind = data.qqbind;
          userInfo.wxbind = data.wxbind;
          this.$store.commit('changeUserInfo', {
            userInfo
          });
          if (!this.$store.state.user.userAvatar) {
            this.$store.commit('changeUserInfo', {
              userAvatar
            });
          }
          if (callback) {
            callback(data);
          }
        }
      })
    },
    setUserInfo(userInfo) {
      let userAvatar = `https://api.bianyue.cn/uploadfile/user_avatar/origin/${
      userInfo.userid
    }.jpg?t=${new Date().getTime()}`;
      this.$store.commit("changeUserInfo", {
        userInfo
      });
      this.$store.commit("changeUserInfo", {
        userAvatar
      });
    },
    setStorage(key, value) {
      localStorage.setItem(key, value);
    },
    getStorage(key) {
      return localStorage.getItem(key);
    },
    removeStorage(key) {
      localStorage.removeItem(key);
    },
    timeDownReady() {
      this.countdown = 60;
      clearTimeout(this.timeDownTimeOut);
      this.timeDownTimeOut = null;
    },
    timeDown(callback, callback2) {
      if (this.countdown <= 0) {
        callback();
        this.countdown = 60;
        return;
      } else {
        callback2(this.countdown);
        this.countdown--;
      }
      this.timeDownTimeOut = setTimeout(() => {
        this.timeDown(callback, callback2);
      }, 1000)
    },
    // 用户其他信息
    getOtherData(type) {
      if (type == 'pan' || !type) {
        this.GET({
          api: "/pan.php?op=init&action=allsize",
          success: data => {
            let userPanData = data.data;
            this.$store.commit('changeUserInfo', {
              userPanData
            });
          }
        });
      }
      if (type == 'photo' || !type) {
        this.GET({
          api: "/box.php?op=photo&action=allsize",
          success: data => {
            let userPhotoData = data.data;
            this.$store.commit('changeUserInfo', {
              userPhotoData
            });
          }
        });
      }
      if (type == 'file' || !type) {
        this.GET({
          api: "/box.php?op=file&action=allsize",
          success: data => {
            let userFileData = data.data;
            this.$store.commit('changeUserInfo', {
              userFileData
            });
          }
        });
      }

    },
    wLoading(config) {
      let $loading = document.getElementById('JS_loading');
      let $loadingText = document.getElementById('JS_loading_text');
      let params = config || {};
      if (params.type == 'hide') {
        $loading.style.display = 'none';
      } else {
        $loading.style.display = 'block';
        $loadingText.innerHTML = params.text || '加载中...';
      }
    },
    //支付
    wxPay(config) {
      let _this = this;
      _this.wLoading();
      Wechat.isInstalled((installed) => {
        if (!installed) {
          _this.wLoading({
            type: 'hide'
          });
          _this.toast('微信未安装');
        } else {
          $.ajax({
            type: "GET",
            url: "https://api.bianyue.cn/weixinpay.php?t=android",
            dataType: "jsonp",
            data: {
              action: "xiadan",
              pay_type: "native_pay_ios",
              pid: config.pid,
              jine: config.price
            },
            success: (data) => {
              _this.wLoading({
                type: 'hide'
              });
              if (data.status == 200) {
                let params = data.data;
                params.packageValue = params.package;
                params.tade_no = data.tade_no;
                Wechat.sendPaymentRequest(params, () => {
                  _this.getUser({});
                  config.success();
                }, (reason) => {
                  _this.toast('支付失败,请重试');
                });
              } else {
                _this.$vux.toast.show({
                  text: data.status,
                  type: 'cancel'
                });
              }
            }
          });
        }
      }, (reason) => {
        _this.toast('支付失败,请重试');
        _this.wLoading({
          type: 'hide'
        });
      });
    },
    alipay(config) {
      let _this = this;
      _this.wLoading();
      $.ajax({
        type: "GET",
        url: "https://api.bianyue.cn/alipay2.php?op=create",
        dataType: "jsonp",
        data: {
          'pid': config.pid,
          'userid': _this.userInfo.userid || '',
          'jine': config.price
        },
        success: (data) => {
          _this.wLoading({
            type: 'hide'
          });
          if (data.status == 200) {
            let params = data;
            params.orderString = data.orderString;
            cordova.plugins.MyAlipay.coolMethod(params.orderString,
              (msg) => {
                if (msg.resultStatus == 9000) {
                  config.success();
                  _this.getUser({});
                } else {
                  _this.toast(msg.memo);
                }
              },
              (msg) => {
                _this.toast('支付失败,请重试');
              }
            );
          } else {
            _this.$vux.toast.show({
              text: data.status,
              type: 'cancel'
            });
          }
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      if (!this.isOnline()) {
        this.jump("/network");
      }
    }, 1500);
  }
}
