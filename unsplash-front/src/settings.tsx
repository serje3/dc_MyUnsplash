const API_URL = "https://151-248-121-170.cloudvps.regruhosting.ru"
export const settings = {
    API: {
        IMAGE:{
            REQUEST: {
                url: API_URL+'/api/v2/image',
                body: {
                    POST: [
                        'label', 'img_url', 'img_file'
                    ]
                }
            },
            DELETE: {
                url: API_URL + '/api/v2/image/delete/',
                kwargs: ['pk']
            }
        },

        AUTH:{
            CREATE_USER:{
                url: API_URL + '/auth/users/',
                body: {
                    POST: [
                        'username', 'password'
                    ]
                }
            },
            GET_USER: {
                url: API_URL + '/auth/users/me/'
            },
            JWT_CREATE: {
                url: API_URL + '/auth/jwt/create/',
                body: {
                    POST: [
                        'username', 'password'
                    ]
                }
            },
            JWT_REFRESH: {
                url: API_URL + '/auth/jwt/refresh',
                body: {
                    POST: [
                        'refresh'
                    ]
                }
            }
        }

    }
}