import request from '@/utils/http'
import { result } from './common'

export interface user {
    id: string
    phone: string
    firstname: string
    lastname: string
    email: string
    password: string
    token:string
}



//请求类型
export interface loginForm {
    phone: string
    password: string
}


//响应类型
export interface loginResponseData extends user{

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



