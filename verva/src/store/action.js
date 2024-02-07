export const login = () => ({
    type: 'LOGIN',
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const userData = (user) => ({
    type: 'USERDATA',
    payload: user,
});

export const token = (token) => ({
    type: 'TOKEN',
    payload: token,
})

export const emailOrPassWrong = (check) => ({
    type: 'CHECKEMAILORPASSWORD',
    payload: check,
})