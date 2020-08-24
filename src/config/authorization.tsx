export default function isAuthorize() {
    if(!localStorage.getItem('token')){
        return false;
    }

    return true;
}