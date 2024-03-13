const initialState = {
    isAuthenticated: false,
    user: {
        userName: '',
        userEmail: '',
        userAge: '',
        virtual_id: ''
    },
    token: '',
    check: false,
    streamBool: false,
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
        case 'USERNAME':
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload.userName,
                },
            };
        case 'TOKEN':
            return {
                ...state,
                token: action.payload,
            };
        case 'CHECKEMAILORPASSWORD':
            return {
                ...state,
                check: action.payload,
            }
        case 'STREAMBOOL':
            return {
                ...state,
                streamBool: true,
            }
        default:
            return state;
    }
};

export default vervaReducer;
