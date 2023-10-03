const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

const isFirstTime = (): boolean => {
  const data = localStorage.getItem('isFirstTime');
  return !!data;
};

export { isAuthenticated, isFirstTime };
