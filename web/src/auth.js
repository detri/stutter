export const setAuth = (username, accessToken) => {
  localStorage.setItem('auth', JSON.stringify({
    username,
    accessToken,
    expDate: Date.now() + 43200000
  }));
};

export const getAuth = () => {
  let auth = localStorage.getItem('auth');
  if (!auth) {
    return false;
  }
  auth = JSON.parse(auth);
  if (Date.now() >= auth.expDate) {
    localStorage.removeItem('auth');
    return false
  }
  return auth;
};