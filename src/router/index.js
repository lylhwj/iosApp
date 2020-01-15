import Vue from 'vue'
import Router from 'vue-router'
import User from '@/page/User'
import Point from '@/page/Point'
import Coupon from '@/page/Coupon'
import Privileges from '@/page/Privileges'
import Info from '@/page/Info'
import InfoAvatar from '@/page/InfoAvatar'
import Security from '@/page/Security'
import Setting from '@/page/Setting'
import Data from '@/page/Data'
import Help from '@/page/Help'
import Versions from '@/page/Versions'
import Lixian from '@/page/Lixian'
import Forget from '@/page/Forget'
import Forget2 from '@/page/Forget2'
import Login from '@/page/Login'
import Register from '@/page/Register'
import Register2 from '@/page/Register2'
import Present from '@/page/Present'
import ModifyPassword from '@/page/ModifyPassword'
import SecurityCode from '@/page/SecurityCode'
import BindPhone from '@/page/BindPhone'
import UnbindPhone from '@/page/UnbindPhone'
import Email from '@/page/Email'
import LoginLog from '@/page/LoginLog'
import PayPoint from '@/page/PayPoint'
import PayPointSuccess from '@/page/PayPointSuccess'
import Pay from '@/page/Pay'
import PaySuccess from '@/page/PaySuccess'
import PaySpace from '@/page/PaySpace'
import PaySpaceSuccess from '@/page/PaySpaceSuccess'
import Message from '@/page/Message'
import BT from '@/page/BT'
import MsgLogin from '@/page/MsgLogin'
import MsgLogin2 from '@/page/MsgLogin2'
import Move from '@/page/Move'
import Scan from '@/page/Scan'
import ScanCodeLogin from '@/page/ScanCodeLogin'
import Photo from '@/page/Photo'
import File from '@/page/File'
import Exchange from '@/page/Exchange'
import SettingPassword from '@/page/SettingPassword'
import Network from '@/page/Network'
import Sign from '@/page/Sign'
import Home from '@/page/Home'
import Favorites from '@/page/Favorites'
import Favorites2 from '@/page/Favorites2'
import Search from '@/page/Search'
import PlayList from '@/page/PlayList'
import Transfer from '@/page/Transfer'
import LinkTask from '@/page/LinkTask'
import Recycle from '@/page/Recycle'
import Recover from '@/page/Recover'
import Feedback from '@/page/Feedback'
import Test from '@/page/Test'

Vue.use(Router)
export default new Router({
  mode: 'hash', 
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }, {
      path: '/point',
      name: 'Point',
      component: Point
    }, {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon
    }, {
      path: '/privileges',
      name: '/Privileges',
      component: Privileges
    }, {
      path: '/info',
      name: 'Info',
      component: Info
    }, {
      path: '/avatar',
      name: 'InfoAvatar',
      component: InfoAvatar
    }, {
      path: '/security',
      name: 'Security',
      component: Security
    }, {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }, {
      path: '/data',
      name: 'Data',
      component: Data
    }, {
      path: '/help',
      name: 'Help',
      component: Help
    }, {
      path: '/versions',
      name: 'Versions',
      component: Versions
    }, {
      path: '/lixian',
      name: 'Lixian',
      component: Lixian
    }, {
      path: '/lixian2',
      name: 'Lixian2',
      component: Lixian
    }, {
      path: '/lixian/:topid',
      name: 'LixianTopid',
      component: Lixian
    }, {
      path: '/forget',
      name: 'Forget',
      component: Forget
    }, {
      path: '/forget2',
      name: 'Forget2',
      component: Forget2
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/register2',
      name: 'Register2',
      component: Register2
    }, {
      path: '/present',
      name: 'Present',
      component: Present
    }, {
      path: '/mPwd',
      name: 'mPwd',
      component: ModifyPassword
    }, {
      path: '/securityCode',
      name: 'SecurityCode',
      component: SecurityCode
    }, {
      path: '/email',
      name: 'Email',
      component: Email
    }, {
      path: '/loginLog',
      name: 'LoginLog',
      component: LoginLog
    }, {
      path: '/payPoint',
      name: 'PayPoint',
      component: PayPoint
    }, {
      path: '/payPointSuccess',
      name: 'PayPointSuccess',
      component: PayPointSuccess
    }, {
      path: '/pay',
      name: 'Pay',
      component: Pay
    }, {
      path: '/paySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    }, {
      path: '/paySpace',
      name: 'PaySpace',
      component: PaySpace
    }, {
      path: '/paySpaceSuccess',
      name: 'PaySpaceSuccess',
      component: PaySpaceSuccess
    }, {
      path: '/message',
      name: 'Message',
      component: Message
    }, {
      path: '/bt',
      name: 'BT',
      component: BT
    }, {
      path: '/unbindPhone',
      name: 'UnbindPhone',
      component: UnbindPhone
    }, {
      path: '/bindPhone',
      name: 'BindPhone',
      component: BindPhone
    }, {
      path: '/msgLogin',
      name: 'MsgLogin',
      component: MsgLogin
    }, {
      path: '/msgLogin2',
      name: 'MsgLogin2',
      component: MsgLogin2
    }, {
      path: '/move',
      name: 'Move',
      component: Move
    }, {
      path: '/scan',
      name: 'Scan',
      component: Scan
    }, {
      path: '/scanCodeLogin',
      name: 'ScanCodeLogin',
      component: ScanCodeLogin
    }, {
      path: '/photo',
      name: 'Photo',
      component: Photo
    }, {
      path: '/photo/:topid',
      name: 'Photo2',
      component: Photo
    }, {
      path: '/file',
      name: 'File',
      component: File
    }, {
      path: '/file/:topid',
      name: 'File2',
      component: File
    }, {
      path: '/network',
      name: 'Network',
      component: Network
    }, {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    }, {
      path: '/settingPassword',
      name: 'SettingPassword',
      component: SettingPassword
    }, {
      path: '/sign',
      name: 'Sign',
      component: Sign
    }, {
      path: '/search',
      name: 'Search',
      component: Search
    }, {
      path: '/playList',
      name: 'PlayList',
      component: PlayList
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites
    }, {
      path: '/favorites2',
      name: 'Favorites2',
      component: Favorites2
    }, {
      path: '/transfer',
      name: 'Transfer',
      component: Transfer
    }, {
      path: '/link',
      name: 'LinkTask',
      component: LinkTask
    }, {
      path: '/recycle',
      name: 'Recycle',
      component: Recycle
    }, {
      path: '/recover/:id',
      name: 'Recover',
      component: Recover
    }, {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    }, {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
