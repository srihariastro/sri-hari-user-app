import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { getRequest, postRequest } from '../../utils/apiRequests';
import * as actionTypes from '../actionTypes';
import { api_url, book_pooja, book_pooja_order_create, customer_home_banner, get_all_pooja_list, get_call_astrologer, get_chat_astrologer, get_new_pooja, get_pooja, get_puja_history_data, get_video_call_astrologer } from '../../config/constants';
import { navigate } from '../../NavigationService';
import { razorpayPayment } from '../../utils/razorpay';
import { Alert } from 'react-native';
import { showToastMessage } from '../../utils/services';
import { PhonepeMall, PhonepePuja } from '../../utils/phonePe';
import axios from 'axios';
import { getPujaHistroy } from '../../config/Constants1';

function* getHomeData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const poojaDataResponse = yield getRequest({
            url: api_url + get_pooja,
        })

        console.log("222", poojaDataResponse)
        if (poojaDataResponse?.success) {
            yield put({ type: actionTypes.SET_POOJA_DATA, payload: poojaDataResponse?.pooja })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}

function* getNewPoojaData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const poojaDataResponse = yield getRequest({
            url: api_url + get_new_pooja,
        })
        console.log("2222", payload)

        if (poojaDataResponse?.success) {
            yield put({ type: actionTypes.SET_NEW_POOJA_DATA, payload: poojaDataResponse?.pooja })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}

// function* getAllPoojaList(actions){
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const poojaListResponse = yield getRequest({
//             url: api_url + get_all_pooja_list,
//         })
//         console.log("first1111",poojaListResponse)

//         if (poojaListResponse?.success) {
//             yield put({ type: actionTypes.SET_ALL_POOJA_LIST, payload: poojaListResponse?.pooja })
//         }

//     } catch (e) {
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         console.log('hii', e);
//     }

// }


function* getBookPooja(actions) {
    // console.log("action", actions)
    try {
        const {payload} = actions
        const { BookPujaData, customerData,pujaPrice } = actions.payload
        console.log(BookPujaData,"BookPujaData")
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const bookedResponse = yield postRequest({
            url: api_url + book_pooja_order_create, 
            data:{
                customerId:customerData?._id,
                amount:pujaPrice
            }
        })
        console.log("bookedResponse", bookedResponse)
        if(bookedResponse?.success) {
            console.log(
                { 
                    orderId : bookedResponse?.orderId,
                    customerId: customerData?._id,
                    amount: bookedResponse?.amount,
                    phoneNumber : customerData?.phoneNumber,
                    pujaId:BookPujaData?.pujaId,
                    mode:BookPujaData?.mode,
                    date:BookPujaData?.date,
                    time:BookPujaData?.time
    
                },"last Puja Response"
            )
           const responseData =  yield PhonepePuja(
            { 
                orderId : bookedResponse?.orderId,
                customerId: customerData?._id,
                amount:  bookedResponse?.amount,
                phoneNumber : customerData?.phoneNumber,
                pujaId:BookPujaData?.pujaId,
                mode:BookPujaData?.mode,
                date:BookPujaData?.date,
                time:BookPujaData?.time

            });

        }
       
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}

function* getBookPoojaHistoryData(actions) {
    console.log("check the payload::::", actions.payload._id);


    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const Response = yield postRequest({
            url: api_url + getPujaHistroy,
            data: { customerId: actions.payload._id }
        })
        console.log("puja histroy:::::", Response)
        if (Response?.success) {
            yield put({ type: actionTypes.SET_BOOK_POOJA_HISTORY_DATA, payload: Response?.results })
        } else {
            showToastMessage({ message: Response?.message })
        }
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        console.log('hii', e);
    }
}




export default function* poojaSaga() {
    yield takeLeading(actionTypes.GET_HOME_DATA, getHomeData);
    yield takeLeading(actionTypes.GET_NEW_POOJA_DATA, getNewPoojaData);
    yield takeLeading(actionTypes.GET_BOOK_POOJA, getBookPooja)
    yield takeLeading(actionTypes.GET_BOOK_POOJA_HISTORY_DATA, getBookPoojaHistoryData)
}