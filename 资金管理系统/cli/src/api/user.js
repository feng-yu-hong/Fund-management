import axios from '../until/http'

/**
 * @description 注册
 * @param {number} phone 
 * @param {string} password
 */
export const Register = (data) => {
    return axios.request({
        url: '/api/user/register',
        method: 'post',
        data: data
    })
}
/**
 * @description 登录
 * @param {number} phone 
 * @param {string} password
 */
export const Login = (data) => {
    return axios.request({
        url: '/api/user/login',
        method: 'post',
        data: data
    })
}

/**
 * @description 账单查询
 * @param {string} phone  no
 * @param {string} password no
 */
export const Query = () => {
    return axios.request({
        url: '/api/user/order/query',
        method: 'get'
    })
}

/**
 * @description 添加查询
 * @param {string} account
 * @param {string} income_remark
 * @param {number} income_type
 * @param {number} income
 * @param {number} pay
 * @param {number} account
 */
export const Add = () => {
    return axios.request({
        url: '/api/user/order/add',
        method: 'post'
    })
}

/**
 * @description 删除查询
 * @param {number} _id
 */
export const Delete = (data) => {
    return axios.request({
        url: '/api/user/order/delete',
        method: 'post',
        data:data
    })
}

/**
 * @description 账单更新
 */
export const Update = (data) => {
    return axios.request({
        url: '/api/user/order/update',
        method: 'post',
        data:data
    })
}




















































// Login({
//     phone:"12",
//     password:""
// }).then(res=>{

// })
// .catch(err=>{

// })