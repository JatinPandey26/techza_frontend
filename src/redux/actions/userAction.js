import { server } from '../store';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const signUpReducer = formdata => async dispatch => {
  try {
    dispatch({ type: 'signUpRequest' });
    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        'Content-type': 'multipart/form-data',
      },

      withCredentials: true,
      credentials: 'include',
    });

    dispatch({ type: 'signUpSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'signUpFail', payload: error.response.data.message });
  }
};

export const loginReducer = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
        credentials: 'include',
      }
    );

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const getMyProfileReducer = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};
export const logoutReducer = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });
    const { data } = await axios.post(
      `${server}/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error });
  }
};

export const addToPlayList = id => async dispatch => {
  try {
    dispatch({ type: 'addToPlaylistRequest' });

    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      {
        _id: id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
        credentials: 'include',
      }
    );

    dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addToPlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const removeFromPlayList = id => async dispatch => {
  try {
    dispatch({ type: 'removeFromPlaylistRequest' });

    const { data } = await axios.delete(
      `${server}/removefromplaylist?_id=${id}`,

      {
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'removeFromPlaylistSuccess', payload: data.courses });
  } catch (error) {
    dispatch({
      type: 'removeFromPlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const buySubscription = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });
    const { data } = await axios.get(
      `${server}/subscribe`,

      {
        withCredentials: true,
        credentials: 'include',
      }
    );

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response.data.message,
    });
  }
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });
    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
      credentials: 'include',
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response.data.message,
    });
  }
};
