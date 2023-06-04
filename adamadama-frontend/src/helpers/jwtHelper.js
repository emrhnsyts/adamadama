import jwt_decode from "jwt-decode"

export const checkJwt = () => {
    const jwt = decodeJwt();
    if (!jwt || isExpired(jwt)) {
        localStorage.clear();
        return false;
    }
    else {
        return true;
    }
}

export const extractUsername = () => {
    return decodeJwt().sub
}

const decodeJwt = () => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
        return jwt_decode(jwt);
    }
}

const isExpired = (jwt) => {
    return jwt.exp < Date.now() / 1000
}

