const initState = {
    datas: [],
    isLogin: true,
    datas_detail: [],
    isLoadingDel1: false,
    isLoadingDel2: true
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'STORE_DATAS':
            return {
                ...state,
                datas: action.datas
            }
        case 'STORE_DATAS_DETAIL':
            return {
                ...state,
                datas_detail: action.datas
            }
        case 'RESET_DETAIL':
            return {
                ...state,
                datas_detail: []
            }
        default:
            return state
    }
}