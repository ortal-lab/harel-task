export const validateName = (username) => {
  if (typeof username === "string") {
    let check = username.toLowerCase();
    return Boolean(check.length > 1 && /^[a-z._-]*$/.test(check));
  }
};
export const validatePhone = (phone) => {
  if (typeof phone === "string") {
    return Boolean(
      phone.length > 1 &&
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phone)
    );
  }
};
export const validatePassword = (password) => {
  if (typeof password === "string") {
    return Boolean(
      password.length > 1 &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
    );
  }
};
export const validateDate = (date) => {
  if (typeof date === "string") {
    return Boolean(
      date.length > 1 &&
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date)
    );
  }
};
export const validateAccount = (account) => {
  if (typeof account === "string") {
    return Boolean(
      account.length > 1 && /^[0-9]{8}-[0-9]{8}(-[0-9]{8})?$/.test(account)
    );
  }
};
export const validateEmail = (email) => {
  if (typeof email === "string") {
    return Boolean(
      email.length > 1 &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    );
  }
};
