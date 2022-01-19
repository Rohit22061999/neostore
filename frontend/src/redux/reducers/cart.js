const initialstate = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0
const user = (state = initialstate, action) => {
    console.log(state)
    switch (action.type) {
        case 'iscart':
            state = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;
            return (state)
        default:
            return (state)
    }
}
export default user;