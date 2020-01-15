 
const state = {
  userInfo: {},
  unreadMessagesCount: 0 ,
  userAvatar:'', 
  userPanData:{},
  userPhotoData:{},
  userFileData:{},
  userPayData:{}
}

// getters
const getters = {
  userInfo: state => state.currentUser,
  unreadMessagesCount: state => state.unreadMessagesCount, 
  userPanData: state => state.userPanData, 
  userPhotoData: state => state.userPhotoData, 
  userFileData: state => state.userFileData, 
  userPayData: state => state.userPayData, 
}

// actions
const actions = {
  
}

// mutations
const mutations = {
  changeUserInfo(state, info) { 
    state = Object.assign(state, info)
  } 
}

export default {
  state,
  getters,
  actions,
  mutations
}
