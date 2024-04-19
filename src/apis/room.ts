import request from '@/utils/http'
import { page, result } from './common'

export interface room {
    roomId: string
    name: string
    bedType: number
    bedTypeText: string
    breakfast: number
    breakfastText: string
    wifi: number
    wifiText: string
    number: string
    price: number
    people: string
    policy: number
    policyText: string
    numberMax: string
    images: image[]
}

export interface image {
    imageId: string
    roomId: string
    imageUrl: string
    name: string
    url: string
}

//请求类型
export interface roomListForm {
    current: number
    size: number
    order: string
    prop: string
    text: string
}

export interface roomUpdateForm {
    roomId: string
    name: string
    bedType: number
    breakfast: string
    wifi: string
    price: string
    people: string
    policy: number
    numberMax: string
    images: image[]


}

export interface roomAddForm {
    name: string
    bedType: number
    breakfast: number
    wifi: number
    price: string
    people: string
    policy: number
    numberMax: string
    images: image[]


}

export interface roomRemoveForm {
    ids: string[]


}


export interface imageListForm {
    roomId: string
}

export interface roomImageForm {
    formData: FormData
}

export interface removeForm {
    name: string
}




//响应类型
export interface roomListResponseData extends page<room> {

}


export interface roomUpdateResponseData {

}

export interface roomAddResponseData {

}

export interface roomRemoveResponseData {

}

export interface imageListResponseData {

}

export interface roomImageResponseData {

}


export interface removeResponseData {

}

//接口
export const roomListAPI = ({ current, size, order, prop, text }: roomListForm) => {
    return request<any, result<roomListResponseData>>({
        url: '/room/list',
        method: 'get',
        params: {
            current,
            size,
            order,
            prop,
            text
        }
    })
}

export const roomUpdateAPI = ({
    roomId,
    name,
    bedType,
    breakfast,
    wifi,
    price,
    people,
    policy,
    numberMax,
    images
}: roomUpdateForm) => {
    return request<any, result<roomUpdateResponseData>>({
        url: '/room/update',
        method: 'post',
        data: {
            roomId,
            name,
            bedType,
            breakfast,
            wifi,
            price,
            people,
            policy,
            numberMax,
            images
        }
    })
}


export const roomAddAPI = ({
    name,
    bedType,
    breakfast,
    wifi,
    price,
    people,
    policy,
    numberMax,
    images
}: roomAddForm) => {
    return request<any, result<roomAddResponseData>>({
        url: '/room/add',
        method: 'post',
        data: {
            name,
            bedType,
            breakfast,
            wifi,
            price,
            people,
            policy,
            numberMax,
            images
        }
    })
}


export const roomRemoveAPI = ({
    ids
}: roomRemoveForm) => {
    return request<any, result<roomRemoveResponseData>>({
        url: '/room/remove',
        method: 'post',
        data: {
            ids
        }
    })
}


//图片处理接口
export const imageListAPI = ({ roomId }: imageListForm) => {
    return request<any, result<image[]>>({
        url: '/room/image/list',
        method: 'get',
        params: {
            roomId
        }
    })
}

export const roomImageAPI = ({ formData }: roomImageForm) => {
    return request<any, result<roomImageResponseData>>({
        url: '/room/image/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data' // 指定请求头为 multipart/form-data
        }
    })
}

export const removeImageAPI = ({ name }: removeForm) => {
    return request<any, result<removeResponseData>>({
        url: '/room/image/delete',
        method: 'post',
        data: {
            name
        }
    })
}