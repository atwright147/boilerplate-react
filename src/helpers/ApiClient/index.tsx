import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { push } from 'react-router-redux';

import { configStore } from '../../store/configStore';

/* eslint-disable @typescript-eslint/no-explicit-any */

const handleRequest = (config: AxiosRequestConfig, store = configStore): AxiosRequestConfig => {
    (store as any).dispatch({ type: 'spinner/ADD' });
    return config;
};

const handleRequestError = (error: AxiosError, store = configStore): Promise<never> => {
    (store as any).dispatch({ type: 'spinner/REMOVE' });
    return Promise.reject(error);
};

const handleResponse = (value: AxiosResponse, store = configStore): AxiosResponse => {
    (store as any).dispatch({ type: 'spinner/REMOVE' });
    return value;
};

const handleResponseError = (error: AxiosError, store = configStore): Promise<never> => {
    (store as any).dispatch({ type: 'spinner/REMOVE' });

    let status: boolean | number = false;
    if (error && error.response && error.response.status) {
        ({ status } = error.response);
    }

    switch (status) {
        case 401:
            (store as any).dispatch(push('/login'));
            break;

        case 404:
            (store as any).dispatch(push('/error/404'));
            break;

        default:
            break;
    }

    return Promise.reject(error);
};

const axiosInstance = axios.create({
    withCredentials: true,
    timeout: 5000,
});

axiosInstance.interceptors.request.use(handleRequest, handleRequestError);
axiosInstance.interceptors.response.use(handleResponse, handleResponseError);

export { axiosInstance as default, handleRequest, handleRequestError, handleResponse, handleResponseError };
