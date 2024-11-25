export const fetchToken = () => localStorage.getItem("token");
export const logout = () => localStorage.removeItem("token");
