import * as actionTypes from '../actionTypes';

export const getHomeData = payload =>({
    type: actionTypes.GET_HOME_DATA,
    payload,
})

export const setHomeBanner = payload =>({
    type: actionTypes.SET_HOME_BANNER,
    payload,
})

export const setCallAstrologer = payload =>({
    type: actionTypes.SET_CALL_ASTROLOGER,
    payload,
})

export const setChatAstrologer = payload =>({
    type: actionTypes.SET_CHAT_ASTROLOGER,
    payload,
})
export const setVideoCallAstrologer = payload =>({
    type: actionTypes.SET_VIDEO_CALL_ASTROLOGER,
    payload,
})

export const getHomeDataOnRefresh = payload =>({
    type: actionTypes.GET_HOME_DATA_ON_REFRESH,
    payload,
})

export const getAstroCompanionData = payload =>({
    type: actionTypes.GET_ASTRO_COMPANION_DATA,
    payload,
})

export const setAstroCompanionData = payload =>({
    type: actionTypes.SET_ASTRO_COMPANION_DATA,
    payload,
})
export const getNotificationData = payload =>({
    type: actionTypes.GET_NOTIFICATION_DATA,
    payload,
})
export const setNotificationData = payload =>({
    type: actionTypes.SET_NOTIFICATION_DATA,
    payload,
})
export const getDeleteAccount = payload =>({
    type: actionTypes.GET_DELETE_ACCOUNT_DATA,
    payload,
})
export const setDeleteAccount = payload =>({
    type: actionTypes.SET_DELETE_ACCOUNT_DATA,
    payload,
})



