import axios from './axios';
import { emailOrPassWrong, login, token, userData } from '../store/action';

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
            console.log("userData", data.user, "\n", data.token);
        })
        .catch((error) => {
            console.error('Error in postDataToServer:', error);
        });
};

export const checkUserFromServer = async (userTocheck, dispatch) => {
    try {
        const response = await axios.post('/login', userTocheck);
        if (!response.success) {
            // dispatch(emailOrPassWrong(true))
            console.log("check email or password");
        }
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
    checkUserFromServer(userTocheck, dispatch)
        .then((data) => {
            if (data.success) {
                dispatch(login());
                dispatch(emailOrPassWrong(false))
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
            body: JSON.stringify({ name: userDataLogin.name }),
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else if (response.status === 422) {
            const errorData = await response.text();
            console.error("Error updating name:", errorData);
            throw new Error(errorData || "Failed to update name");
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating name:", error);
        throw error;
    }
};

export const updatePassInData = async (userToken, userPass) => {
    try {
        const response = await fetch(`${BASE_URL}/update-pass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ old_pass: userPass.oldPassword, new_pass: userPass.newPassword }),
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else if (response.status === 422) {
            const errorData = await response.text();
            throw new Error(errorData || "Failed to change Password");
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error Changing password:", error);
        throw error;
    }
};

export const deleteUser = async (userToken) => {
    console.log("Sending data to server for delete:", userToken);
    try {
        const response = await fetch(`${BASE_URL}/delete-account`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        if (response.status) {
            return response.data;
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const updateStatusInData = async (userToken, userDataLogin) => {
    try {
        const response = await fetch(`${BASE_URL}/update-creator-status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ status: userDataLogin.status }),
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else if (response.status === 422) {
            const errorData = await response.text();
            console.error("Error updating name:", errorData);
            throw new Error(errorData || "Failed to update name");
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating name:", error);
        throw error;
    }
};

export const uploadvideo = async (userToken, dataToSend) => {
    try { 
        const response = await axios.post('/uploadVideo', dataToSend, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${userToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

export const uploadNewVideo = (userToken, dataToSend) => {
    console.log("Sending creator to server:", dataToSend);
    uploadvideo(userToken, dataToSend)
        .then((data) => {
            if (data.success) {
                return data;
            }
            console.log("Server response:", data);
        })
        .catch((error) => {
            console.error('Error in convertToCreator:', error);
        });
};
