const initialstate = false;
const user = (state = initialstate, action) => {
    console.log(state)
    switch (action.type) {
        case 'isuser':
            if (sessionStorage.getItem('user') != undefined)
                return (state = true)
            else {
                return (state = false)
            }
        default:
            return (state)
    }
}
export default user;