import * as actionTypes from '../actionTypes'

export const getPoojaData = payload => ({
    type: actionTypes.GET_POOJA_DATA,
    payload,
})
export const setPoojaData = payload => ({
    type: actionTypes.SET_POOJA_DATA,
    payload,
})
export const getNewPoojaData = payload => ({
    type: actionTypes.GET_NEW_POOJA_DATA,
    payload,
})
export const setNewPoojaData = payload => ({
    type: actionTypes.SET_NEW_POOJA_DATA,
    payload,
})

export const getAllPoojaList = payload =>({
    type : actionTypes.GET_ALL_POOJA_LIST,
    payload
})

export const getBookPooja = payload =>({
    type : actionTypes.GET_BOOK_POOJA,
    payload
})

export const setBookPooja = payload =>({
    type : actionTypes.SET_BOOK_POOJA,
    payload
})

export const getBookPoojaHistory = payload =>({
    type : actionTypes.GET_BOOK_POOJA_HISTORY_DATA,
    payload
})

export const setBookPoojaHistory = payload =>({
    type : actionTypes.SET_BOOK_POOJA_HISTORY_DATA,
    payload
})

export const getPujaHistory = payload =>({
    type : actionTypes.GET_POOJA_HISTORY_LIST,
    payload
})

export const setPujaHistory = payload =>({
    type : actionTypes.SET_POOJA_HISTORY_LIST,
    payload
})


export const openModal = () => ({ type: actionTypes.OPEN_MODAL, });
export const closeModal = () => ({ type: actionTypes.CLOSE_MODAL });