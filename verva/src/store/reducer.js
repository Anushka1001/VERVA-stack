const initialState = {
    isAuthenticated: false,
    user: {
        userName: '',
        userEmail: '',
        userAge: '',
    },
    token: ''
};

const vervaReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...initialState,
            };
        case 'USERDATA':
            return {
                ...state,
                user: action.payload,
            };
        case 'TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export default vervaReducer;
