const initState = {
    datas:[],
    isLogin: true
}

export default (state = initState, action) => {
    switch(action.type){
        case 'STORE_DATAS' : 
            return{
                ...state,
                datas: action.datas
            }
        default:
            return state
    }
}