import request from '@/utils/http'
import { result } from './common'

export interface user {
    id: string
    phone: string
    firstname: string
    lastname: string
    email: string
    password: string
    token: string
}



//请求类型
export interface loginForm {
    phone: string
    password: string
}

export interface updateForm extends user {

}



//响应类型
export interface loginResponseData extends user {

}

export interface updateResponseData extends user {

}


//接口
export const loginAPI = ({ phone, password }: loginForm) => {
    return request<any, result<loginResponseData>>({
        url: '/user/login',
        method: 'POST',
        data: {
            phone,
            password
        }
    })
}

export const updateAPI = ({ id, phone, password, firstname, lastname, email, token }: updateForm) => {
    return request<any, result<updateResponseData>>({
        url: '/user/update',
        method: 'POST',
        data: {
            id,
            phone,
            password,
            firstname,
            lastname,
            email,
            token
        }
    })
}


