import axios from 'axios'

const storeDatas = (payload) => ({ type: 'STORE_DATAS', datas: payload })

export const getAllDatas = () => {
    return (dispatch) => {
        axios.get('https://dinartech.com/tog/public/api/getall')
            .then(response => {
                dispatch(storeDatas(response.data))
            })

    }
}

export const createName = (payload) => {
    const body = {
        nama: payload
    }
    return (dispatch) => {
        axios.post('https://dinartech.com/tog/public/api/createname', body)
            .then(response => {
                console.log(response)
            })

    }
}