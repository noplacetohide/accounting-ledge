import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getCookie('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== 'undefined') {
            const status = error?.response?.status;
            if (status === 401) {
                deleteCookie('access_token');
                import('next/navigation').then(({ useRouter }) => {
                    const router = useRouter();
                    router.push('/get-started');
                }).catch(() => {
                    window.location.href = '/get-started';
                });
            }
        }
        return Promise.reject(error);
    }
);

export default api;