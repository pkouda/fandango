import axios from "axios";
import {history} from "../App";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const ROOT_URL = "http://localhost:3001"
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const BASIC_INFO_SUCCESS = "BASIC_INFO_SUCCESS";
export const BASIC_INFO_ERROR = "BASIC_INFO_ERROR";
export const EMAIL_SUCCESS = "EMAIL_SUCCESS";
export const EMAIL_ERROR = "EMAIL_ERROR";
export const PASSWORD_SUCCESS = "PASSWORD_SUCCESS";
export const PASSWORD_ERROR = "PASSWORD_ERROR";
export const SAVE_PAYMENT_SUCCESS = "SAVE_PAYMENT_SUCCESS";
export const SAVE_PAYMENT_ERROR = "SAVE_PAYMENT_ERROR";
export const DELETE_PAYMENT_SUCCESS = "DELETE_PAYMENT_SUCCESS";
export const DELETE_PAYMENT_ERROR = "DELETE_PAYMENT_ERROR";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_ERROR = "USER_DETAILS_ERROR";
export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_NULL = "FETCH_USER_NULL";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILED = "UPLOAD_FAILED";

export const MOVIEHALL_SIGN_IN_SUCCESS = "MOVIEHALL_SIGN_IN_SUCCESS";
export const MOVIEHALL_SIGN_IN_ERROR = "MOVIEHALL_SIGN_IN_ERROR"

export const IMAGE_SUCCESS = "IMAGE_SUCCESS";

axios.defaults.withCredentials = true;

export function signin(values) {
    return function (dispatch) {
        const request = axios.post(`${ROOT_URL}/user/signin`, values, {withCredentials: true});
        var action_type = null;
        request.then(function (res) {
            console.log("res", res.status);
            if (res.status == 201) {
                window.localStorage.setItem('user', res.data.user);
                window.localStorage.setItem('isLoggedIn', true);
                console.log("response received");
                history.push('/home');
                dispatch({type: SIGN_IN, payload: request});
            }
            else {
                if (res.status === 200) {
                    console.log("response received");
                    console.log(request)
                    // dispatch({type: SIGN_IN, payload: request});
                }
            }
        });
        request.catch(function (err) {
            // dtype = {message:'error received'}
            console.log("caught:", err.response);
            dispatch({type: SIGN_IN_ERROR, payload: request});
        });
        console.log(action_type);
    }

}


export function signout(values) {
    console.log(values);

    return (dispatch) => {
        const response = axios.get(`${ROOT_URL}/user/signout`)
            .then(response => {
                console.log(response.data);
                window.localStorage.clear();
                history.push('/signin');
                dispatch(() => {
                    return {
                        type: SIGN_OUT,
                        payload: response
                    }
                })
            }).catch(error => {
                console.log(error);
            });
    }
}


export function signoutMovieHall(values) {
    console.log(values);

    return (dispatch) => {
        const response = axios.get(`${ROOT_URL}/user/signout`)
            .then(response => {
                console.log(response.data);
                window.localStorage.clear();
                history.push('/moviehallSignin');
                dispatch(() => {
                    return {
                        type: SIGN_OUT,
                        payload: response
                    }
                })
            }).catch(error => {
                console.log(error);
            });
    }
}


export function fetchUser() {
    return function (dispatch) {
        let rtype = null;
        let dtype = null;
        const request = axios.get(`${ROOT_URL}/user/fetchuser`, {withCredentials: true});
        request.then(function (res) {
            if (res.status == 201) {
                console.log('response received', res);
                dtype = request;
                dispatch({type: FETCH_USER, payload: res.data});
            }
            else {
                dtype = request;
                dispatch({type: FETCH_USER_NULL, payload: res.data});
            }

        });
        request.catch(function (err) {
            localStorage.setItem('user', err.user);
            dtype = {message: 'error received'};
            console.log("error:", err);
        });

    }

}

export function getUserDetails() {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.get(`${ROOT_URL}/user/userDetails`)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data);
                dispatch({type: USER_DETAILS_SUCCESS, payload: res.data.user});
            })
            .catch((error) => {
                dispatch({type: USER_DETAILS_ERROR, payload: error})
            });
    }
}


export function changeBasicInfo(userdata) {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.post(`${ROOT_URL}/user/basicInfo`, userdata)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data.user);
                dispatch({type: BASIC_INFO_SUCCESS, payload: res.data.user});
            })
            .catch((error) => {
                dispatch({type: BASIC_INFO_ERROR, payload: error})
            });

    }
}

export function changeEmail(userdata) {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.post(`${ROOT_URL}/user/email`, userdata)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res);
                dispatch({type: EMAIL_SUCCESS, payload: res.data});
            })
            .catch((error) => {
                dispatch({type: EMAIL_ERROR, payload: error})
            });

    }
}


export function uploadImage(payload) {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.post(`${ROOT_URL}/user/image`, payload, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': payload.get('mypic').type,
            }
        })
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data);
                dispatch({type: IMAGE_SUCCESS, payload: res.data});
            })
            .catch((error) => {
                // dispatch({type: EMAIL_ERROR, payload: error})
            });

    }
}

export function changePassword(userdata) {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.post(`${ROOT_URL}/user/password`, userdata)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data);

                dispatch({type: PASSWORD_SUCCESS, payload: res.data});
            })
            .catch((error) => {
                dispatch({type: PASSWORD_ERROR, payload: error})
            });

    }

}

export function savePaymentMethod(userdata) {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.post(`${ROOT_URL}/user/savePayment`, userdata)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data);

                dispatch({type: SAVE_PAYMENT_SUCCESS, payload: res.data});
            })
            .catch((error) => {
                dispatch({type: SAVE_PAYMENT_ERROR, payload: error})
            });

    }

}

export function deletePaymentMethod(userdata) {
    return function (dispatch) {
        console.log("Inside the sign up actions");
        axios.post(`${ROOT_URL}/user/delPayment`, userdata)
            .then((res) => {
                console.log("Inside actions 'Response'-> ", res.data);

                dispatch({type: DELETE_PAYMENT_SUCCESS, payload: res.data});
            })
            .catch((error) => {
                dispatch({type: DELETE_PAYMENT_ERROR, payload: error})
            });

    }
}

export function changeImage(userdata) {
    return function (dispatch) {
        let formData = new FormData();
        formData.append('name', userdata.picname);
        formData.append('myfile', userdata.newfile[0]);
        console.log("Inside the sign up actions");
        axios(`${ROOT_URL}/user/upload`, {
            method: "post",
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}},
            withCredentials: true
        }).then((res) => {
            console.log("Inside actions 'Response'-> ", res.data);
            if (res.status == 201) {
                alert("profile updated successfully");
                history.push('/dashboard');
            }
            dispatch({type: UPLOAD_SUCCESS, payload: res.data});
        })
            .catch((error) => {
                dispatch({type: UPLOAD_FAILED, payload: error})
            });
    }
}

export function movieHallSignin(values) {
    return function (dispatch) {
        const request = axios.post(`${ROOT_URL}/user/movieHallSignin`, values, {withCredentials: true});
        var action_type = null;
        request.then(function (res) {
            console.log("res", res.status);
            if (res.status == 201) {
                console.log("response received",res);
                history.push('/movieHall-home');
                dispatch({type: SIGN_IN, payload: request});
            }
            else {
                if (res.status === 200) {
                    console.log("response received");
                    console.log(request)
                    dispatch({type: SIGN_IN_ERROR, payload: request});
                }
            }
        });
        request.catch(function (err) {
            // dtype = {message:'error received'}
            console.log("caught:", err.response);
        });
        console.log(action_type);
    }
}

export function adminSignin(values) {
    return function (dispatch) {
        const request = axios.post(`${ROOT_URL}/user/adminSignin`, values, {withCredentials: true});
        var action_type = null;
        request.then(function (res) {
            console.log("res", res.status);
            if (res.status === 201) {
                console.log("Admin response received",res);
                history.push('/home');
                dispatch({type: SIGN_IN, payload: request});
            }
            else {
                if (res.status === 200) {
                    console.log("Admin error received");
                    console.log(request)
                    dispatch({type: SIGN_IN_ERROR, payload: request});
                }
            }
        });
        request.catch(function (err) {
            // dtype = {message:'error received'}
            console.log("caught:", err.response);
        });
        console.log(action_type);
    }
}