import { baseUrl as baseURL, baseImgUrl as baseImgURL, GOOGLE_API_KEY as GOOGLE_API } from "../../../config";
export const isLogin = () => {
    if (typeof window !== 'undefined') {
        let storageVal = {};
        if (localStorage.getItem('loggedInUser') !== null) {
            storageVal = JSON.parse(localStorage.getItem('loggedInUser'));
            return storageVal.token ? true : false;
        }

    }
    return false;
};
export let totalMessageNotification = 0

export const notificationHandler = () => {
    if (typeof window !== 'undefined') {
        totalMessageNotification = totalMessageNotification + 1

    }
    return "";
}

export const currentUserId = () => {
    if (typeof window !== 'undefined') {
        let storageVal = {};
        if (localStorage.getItem('loggedInUser') !== null) {
            storageVal = JSON.parse(localStorage.getItem('loggedInUser'));
            return storageVal.token ? storageVal.user.id : "";
        }

    }
    return "";
};


export const currentOrganizationInfo = () => {
    if (typeof window !== 'undefined') {
        let orgData = {};
        if (localStorage.getItem('currentOrganization') !== null) {
            orgData = JSON.parse(localStorage.getItem('currentOrganization'));
            return orgData;
        }
    }
    return "";
};


export const currOrganizationId = () => {
    if (typeof window !== 'undefined') {
        let storageVal = null;
        if (localStorage.getItem('currentOrganization') !== null) {
            storageVal = JSON.parse(localStorage.getItem('currentOrganization'));
            return storageVal? storageVal.id : null;
        }
    }
    return "";
};

export const currOrganizationSlug = () => {
    if (typeof window !== 'undefined') {
        let storageVal = null;
        if (localStorage.getItem('currentOrganization') !== null) {
            storageVal = JSON.parse(localStorage.getItem('currentOrganization'));
            return storageVal? storageVal.slug : null;
        }
    }
    return "";
};

export const contactListingData = () => {
    if (typeof window !== 'undefined') {
        let listingData = {};
        if (localStorage.getItem('listingData') !== null) {
            listingData = JSON.parse(localStorage.getItem('listingData'));
            return listingData;
        }
        else
            return undefined;
    }
    return '';
}

export const accessToken = () => {
    if (typeof window !== 'undefined') {
        let accessToken = "";
        if (localStorage.getItem('loggedInUser') !== null) {
            accessToken = JSON.parse(localStorage.getItem('loggedInUser'));
            accessToken = accessToken.token;
        }
        return accessToken;
    }
    return false;
};

export const Logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('referCode');
        window.localStorage.clear();
    }
    return;
};

export const isProfileCompleted = () => {
    if (typeof window !== 'undefined') {
        let storageVal = {};
        if (localStorage.getItem('loggedInUser') !== null) {
            storageVal = JSON.parse(localStorage.getItem('loggedInUser'));
            return (storageVal.user && storageVal.user.user_profile !== undefined && storageVal.user.user_profile !== null) ? true : false;
        }

    }
    return false;
};

export const getLoginData = () => {
    if (typeof window !== 'undefined') {
        let storageVal = {};
        if (localStorage.getItem('loggedInUser') !== null) {
            storageVal = JSON.parse(localStorage.getItem('loggedInUser'));
            return storageVal.user;
        } else {
            return undefined;
        }
    }
};
export const removeListinData = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('listingData') !== null) {

            localStorage.removeItem('listingData')
            return true
        }
        return ''
    }
}

export const getReferURL = (code) => {
    let url = "";
    if (typeof window !== 'undefined') {
        return `${window.location.protocol}//${window.location.host}/?refer=${code}`
    }
    return url;
}
export const getLatLng = () => {
    if (typeof window !== 'undefined') {
        if ("geolocation" in window.navigator) {
            window.navigator.geolocation.getCurrentPosition(async function (
                position
            ) {
                return position;
                // return {
                //     lat: position.coords.latitude,
                //     lng: position.coords.longitude,
                // };
            });
        } else {
            alert("Please allow location for the map");
        }
    }
}


export const baseUrl = baseURL;
export const baseImgUrl = baseImgURL;
export const userId = currentUserId();
export const currentOrganization = currentOrganizationInfo();
export const currOrgId = currOrganizationId();
export const currOrgSlug = currOrganizationSlug();
export const listingData = contactListingData();
export const GOOGLE_API_KEY = GOOGLE_API;
