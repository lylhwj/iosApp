import config from './config.js';
let base = {
  BASEURL: process.env.APIURL
}
export default {
  // 判断是否需要验证码
  isCaptcha(params) {
    return config.post(`${base.BASEURL}/auth/captcha/is_show`, params);
  },
  // 判断手机是否注册过
  isRegister(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/mobile/unique/check`, params, mConfig);
  },
  isRegister2(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/mobile/unique/check2`, params, mConfig);
  },
  // 注册
  regGetCode(params, mConfig) {
    params.sms_code_mini=1;
    return config.post(`${base.BASEURL}/auth/mobile/code`, params, mConfig);
  },
  register(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/register/mobile`, params, mConfig);
  },
  // 忘记密码
  findPwd(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/password/reset`, params, mConfig);
  },
  // 登录
  login(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/login`, params, mConfig);
  },
  phoneGetCode(params, mConfig) {
    params.sms_code_mini=1;
    return config.post(`${base.BASEURL}/auth/mobile/code`, params, mConfig);
  },
  phoneLogin(params, mConfig) {
    return config.post(`${base.BASEURL}/auth/login/quick`, params, mConfig);
  },
  yunLogin() {
    return config.post(`${base.BASEURL}/api_phpcms/login`);
  },
  // 第三方登录
  qqLogin(params) {
    return config.get(`${base.BASEURL}/oauth2/callback/qqnative`, params);
  },
  qqLoginIsSuccess() {
    return config.post(`${base.BASEURL}/oauth2/check_oauth_status`);
  },
  wxLogin(params) {
    return config.get(`${base.BASEURL}/oauth2/callback/weixin`, params);
  },
  wxLoginIsSuccess() {
    return config.post(`${base.BASEURL}/oauth2/check_oauth_status`);
  },
  // 手机绑定
  bindphone(params) {
    return config.post(`${base.BASEURL}/oauth2/callback/mobile/bind`, params);
  },
  // 手机绑定
  bindphone2(params) {
    return config.post(`${base.BASEURL}/user/bindMobile`, params);
  },
  // 判断是否设置密码
  isPass() {
    return config.post(`${base.BASEURL}/auth/password/queryInit`);
  },
  // 设置密码
  settingPass(params) {
    return config.post(`${base.BASEURL}/auth/password/set`, params);
  },
  // 退出登录
  logout() {
    return config.post(`${base.BASEURL}/auth/logout`);
  },
  // 文件
  getFile(params) {
    return config.get(`${base.BASEURL}/file`, params);
  },
  getFileTree(params) {
    return config.get(`${base.BASEURL}/file/tree/move`, params);
  },
  addFile(params) {
    return config.post(`${base.BASEURL}/file/folder`, params);
  },
  fileDetail(id) {
    return config.get(`${base.BASEURL}/file/${id}`);
  },
  editFile(params) {
    return config.put(`${base.BASEURL}/file/${params.id}`, params);
  },
  delFile(params) {
    return config.del(`${base.BASEURL}/file/destroy_bat_recovery`, params);
  },
  dragFile(params) {
    return config.post(`${base.BASEURL}/file/tree`, params);
  },
  dragBatFile(params) {
    return config.post(`${base.BASEURL}/file/tree/bat`, params);
  },
  getFileStream(params) {
    return config.post(`${base.BASEURL}/file/download_url/${params.id}`, params);
  },
  // 相册
  getPhoto(params) {
    params.alum = 1;
    return config.get(`${base.BASEURL}/file`, params);
  },
  getPhotoTree(params) {
    params.alum = 1;
    return config.get(`${base.BASEURL}/file/tree/move`, params);
  },
  addPhoto(params) {
    params.alum = 1;
    return config.post(`${base.BASEURL}/file/folder`, params);
  },
  photoDetail(id) {
    return config.get(`${base.BASEURL}/file/${id}?alum=1`);
  },
  editPhoto(params) {
    params.alum = 1;
    return config.put(`${base.BASEURL}/file/${params.id}`, params);
  },
  delPhoto(params) {
    params.alum = 1;
    return config.del(`${base.BASEURL}/file/destroy_bat_recovery`, params);
  },
  dragPhoto(params) {
    params.alum = 1;
    return config.post(`${base.BASEURL}/file/tree`, params);
  },
  dragBatPhoto(params) {
    params.alum = 1;
    return config.post(`${base.BASEURL}/file/tree/bat`, params);
  },
  getPhotoStream(params) {
    params.alum = 1;
    return config.post(`${base.BASEURL}/file/download_url/${params.id}`, params);
  },
  // 离线下载
  getLoad(params) {
    return config.get(`${base.BASEURL}/lixian/list`, params);
  },
  getLoadTree(params) {
    return config.get(`${base.BASEURL}/lixian/tree/move`, params);
  },
  addLoad(params) {
    localStorage.setItem('yunVersions',new Date().getTime());
    return config.post(`${base.BASEURL}/lixian/folder`, params);
  },
  loadDetail(id) {
    return config.get(`${base.BASEURL}/lixian/${id}`);
  },
  editLoad(params) {
    localStorage.setItem('yunVersions',new Date().getTime());
    return config.put(`${base.BASEURL}/lixian/${params.id}`, params);
  },
  delLoad(params) {
    localStorage.setItem('yunVersions',new Date().getTime());
    return config.del(`${base.BASEURL}/lixian/destroy_bat_recovery`, params);
  },
  dragLoad(params) {
    localStorage.setItem('yunVersions',new Date().getTime());
    return config.post(`${base.BASEURL}/lixian/tree`, params);
  },
  dragBatLoad(params) {
    localStorage.setItem('yunVersions',new Date().getTime());
    return config.post(`${base.BASEURL}/lixian/tree/bat`, params);
  },
  // 扫码登录
  getUserName() {
    return config.post(`${base.BASEURL}/user/getQrCodeLoginMsg`);
  },
  // 签到
  signLog(params) {
    return config.post(`${base.BASEURL}/checkIn/log`, params);
  },
  sign(params) {
    return config.post(`${base.BASEURL}/checkIn/index`, params);
  },
  // 搜索
  search(params) {
    return config.post(`${base.BASEURL}/search/index`, params);
  },
  // VIP支付
  wxPay(params) {
    return config.post(`${base.BASEURL}/pay/createOrder/weixinApp`, params);
  },
  alipay(params) {
    return config.post(`${base.BASEURL}/pay/createOrder/alipayApp`, params);
  },
  // 离线面板
  lixianDown(params) {
    return config.get(`${base.BASEURL}/lixian_v2/list/task`, params);
  },
  getLixianList(params) {
    return config.get(`${base.BASEURL}/lixian_v2/list`, params);
  },
  delLixanList(params) {
    return config.post(`${base.BASEURL}/lixian_v2/list/task/clearCompletedByIds`, params);
  },
  clearLixanList(params) {
    return config.post(`${base.BASEURL}/lixian_v2/list/task/clearByType`, params);
  },
  // 路径
  getFamily(params){
    return config.get(`${base.BASEURL}/lixian/tree/family`, params);
  },
  // 收藏
  getMask() {
    return config.get(`${base.BASEURL}/collection/catalog`);
  },
  addMask(params) {
    return config.post(`${base.BASEURL}/collection/catalog`, params);
  },
  editMask(params) {
    return config.put(`${base.BASEURL}/collection/catalog`, params);
  },
  delMask(params) {
    return config.del(`${base.BASEURL}/collection/catalog`, params);
  },
  addToMask(params) {
    return config.post(`${base.BASEURL}/collection`, params);
  },
  getDetailMask(params) {
    return config.get(`${base.BASEURL}/collection/info`, params);
  },
  removeMask(params) {
    return config.del(`${base.BASEURL}/collection`, params);
  },
  // VIP支付
  wxPay(params){
    return config.post(`${base.BASEURL}/pay/createOrder/weixinApp`,params); 
  },
  alipay(params){
    return config.post(`${base.BASEURL}/pay/createOrder/alipayApp`,params); 
  },
  payList(params){
    return config.post(`${base.BASEURL}/pay/paymentList`,params);  
  },
  wxWapPay(params){
    return config.post(`${base.BASEURL}/pay/createOrder/weixinWap`,params); 
  },
  wxWapPayIsSuccess(params,mConfig){
    return config.post(`${base.BASEURL}/pay/queryOrderStatusInBrowser`,params,mConfig); 
  },
   //回收站
   getRecover(params){
    return config.post(`${base.BASEURL}/recovery/recovery_list`, params); 
   }, 
   clearRecover(params){
    return config.post(`${base.BASEURL}/recovery/recovery_qingkong_select`, params); 
   },
   clearRecover2(params){
    return config.post(`${base.BASEURL}/recovery/recovery_qingkong`, params); 
   },
   huanyuanFileRecover(params){
    return config.post(`${base.BASEURL}/file/recovery/recovery_huanyuan`, params); 
   },
   huanyuanFileRecover2(params){
    return config.post(`${base.BASEURL}/file/recovery/recovery_huanyuan2`, params); 
   },
   batdelFileRecover(params){
    return config.post(`${base.BASEURL}/file/recovery/destroy_bat_recovery`, params); 
   },
   huanyuanLixianRecover(params){
    return config.post(`${base.BASEURL}/lixian/recovery/recovery_huanyuan`, params); 
   },
   huanyuanLixianRecover2(params){
    return config.post(`${base.BASEURL}/lixian/recovery/recovery_huanyuan2`, params); 
   },
   batdelLixianRecover(params){
    return config.post(`${base.BASEURL}/lixian/recovery/destroy_bat_recovery`, params); 
   },
   //引导
   guidanceMark(params){
      return config.post(`${base.BASEURL}/user/guidanceMark`, params); 
   },
}
