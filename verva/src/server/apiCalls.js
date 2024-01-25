import axios from './axios';

export const postData = async (dataToSend) => {
    try {
        const response = await axios.post('/register', dataToSend);
        return response.data;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

export const postDataToServer = (dataToSend) => {
    console.log("Sending data to server:", dataToSend);

    postData(dataToSend)
        .then((data) => {
            console.log("Server response:", data);
        })
        .catch((error) => {
            console.error('Error in postDataToServer:', error);
        });
};

export const checkUserFromServer = async (userTocheck) => {
    try {
        const response = await axios.post('/login', userTocheck);
        return response.data;
    } catch (error) {
        console.log('Error Validating User:', error);
        throw error;
    };
}

export const loginUser = (userTocheck) => {
    console.log("Sending data to server:", userTocheck);
    checkUserFromServer(userTocheck)
        .then((data) => {
            console.log("Server response:", data);
        })
        .catch((error) => {
            console.error('Error in postDataToServer:', error);
        });
};