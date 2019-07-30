import config from './config';

const TokenService = {
    saveAuthToken(token) {
        sessionStorage.setItem(config.TOKEN_KEY, token);
    }
};

export default TokenService;