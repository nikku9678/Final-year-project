// Auth actions
export const loginAction = (userData) => async (dispatch) => {
    try {
      dispatch(login(userData)); // Dispatch login action with user data
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };
  
  export const logoutAction = () => async (dispatch) => {
    try {
      dispatch(logout()); // Dispatch logout action
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  