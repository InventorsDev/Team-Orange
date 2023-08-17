export const globalValidateName = (name) => {
    if (name.length >= 1 && name !== "") {
        return true;
    } else {
        return false;
    }
};

export const globalValidateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isEmailValid = !!email.match(emailRegex);
    return isEmailValid;
};

export const globalValidatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[!@#$%^&*()\-=+{};:,<.>/?[\]\\|`~])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    const isPasswordValid = !!password.match(passwordRegex);
    return isPasswordValid;
};

export const preloadImages = (imageArray) => {
    const promises = imageArray.map((images) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = images;
            image.onload = resolve;
            image.onerror = reject;
        });
    });
    return Promise.all(promises);
};

export const api = "https://tranquil.skrind.com/api/v1";

export const Oauth =
    "https://accounts.google.com/o/oauth2/auth?client_id=834746144707-caq2kavpv92okmv38beutlabr023qg7p.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ftranquil.skrind.com%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code";

export const newsapi = "https://newsapi.org/v2";
export const newstoken = "009097bbfe814b5e875294e918b80f26";
