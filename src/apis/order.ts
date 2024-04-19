import request from '@/utils/http'
import { page, result } from './common'

export interface order {
    id: string
    userId: string
    hotelId: string
    roomName: string
    status: number
    statusText: string
    createDate: Date
    createDateText: string
    checkInDate: Date
    checkInDateText: string
    checkOutDate: Date
    checkOutDateText: string
    cancelDate: Date
    cancelDateText: string
    totalPrice:number
    firstname: string
    lastname: string
    phone: String
}


//请求类型
export interface orderListForm {
    current: number
    size: number
    order: string
    prop: string
    status: number
    phone: string
}

export interface orderUpdateForm {
    orderId: string
    status: number

}


//响应类型
export interface orderListResponseData extends page<order> {

}

export interface orderUpdateResponseData {

}

//接口
export const orderListAPI = ({ current, size, order, prop, status, phone }: orderListForm) => {
    return request<any, result<orderListResponseData>>({
        url: '/order/list',
        method: 'get',
        params: {
            current,
            size,
            order,
            prop,
            status,
            phone
        }
    })
}

export const orderUpdateAPI = ({ orderId, status }: orderUpdateForm) => {
    return request<any, result<orderListResponseData>>({
        url: '/order/update',
        method: 'post',
        data: {
            orderId,
            status
        }
    })
}




