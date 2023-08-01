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
