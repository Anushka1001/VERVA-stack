import axios from './axios';
import { login, token, userData } from '../store/action';

export const postData = async (dataToSend) => {
    try {
        const response = await axios.post('/register', dataToSend);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

export const postDataToServer = (dataToSend, dispatch) => {
    console.log("Sending data to server:", dataToSend);
    postData(dataToSend)
        .then((data) => {
            if (data.success) {
                dispatch(login());
            }
            dispatch(userData(data.user));
            dispatch(token(data.token))
            console.log("Server response:", data);
            console.log("blah", data.user, "\n", data.token);
        })
        .catch((error) => {
            console.error('Error in postDataToServer:', error);
        });
};

export const checkUserFromServer = async (userTocheck) => {
    try {
        const response = await axios.post('/login', userTocheck);
        const { access_token } = response.data.access_token;
        localStorage.setItem('token', access_token);
        return response.data;
    } catch (error) {
        console.log('Error Validating User:', error);
        throw error;
    };
}

export const loginUser = (userTocheck, dispatch) => {
    console.log("Sending data to server:", userTocheck);
    checkUserFromServer(userTocheck)
        .then((data) => {
            if (data.success) {
                dispatch(login());
            }
            dispatch(userData(data.userDetails));
            dispatch(token(data.access_token))
            console.log("Server response:", data);
            console.log("blahlogin", data.userDetails, "\n", data.access_token);
        })
        .catch((error) => {
            console.error('Error in postDataToServer:', error);
        });
};