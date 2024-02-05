import axios from './axios';
import { login, token, userData } from '../store/action';

const BASE_URL = "http://localhost:5000";

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
        })
        .catch((error) => {
            console.error('Error in postDataToServer:', error);
        });
};

export const updateNameInData = async (userToken, userDataLogin) => {
    try {
        const response = await fetch(`${BASE_URL}/update-name`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ name: userDataLogin.name }), // Ensure the correct field name
        });

        if (response.status === 200) {
            // Success: return a success message or any relevant data
            const data = await response.json();
            return data;
        } else if (response.status === 422) {
            // Unprocessable Entity: log the error message
            const errorData = await response.text();
            console.error("Error updating name:", errorData);
            throw new Error(errorData || "Failed to update name");
        } else {
            // Handle other status codes as needed
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating name:", error);
        throw error;
    }
};
