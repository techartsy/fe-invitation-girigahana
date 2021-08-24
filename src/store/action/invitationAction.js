import axios from 'axios';
const baseUrl = 'https://server-diesnatalis.herokuapp.com/diesnatalis/invitation/admin/';

export const fetchParticipants = () => {
  return(dispatch) => {
    axios({
      url: `${baseUrl}data-anggotas`,
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'FETCH_PARTICIPANTS',
        payload: data.data.anggota
      })
    })
    .catch((err) => {
      console.log(err);
    });
  };
};

export const postRegistration = (dataUser) => {
  return(dispatch) => {
    axios({
      url: `${baseUrl}regist-anggota`,
      method: 'POST',
      data: dataUser
    })
    .then(({ data }) => {
      dispatch({
        type: 'POST_REGISTRATION',
        payload: data.data
      });
    })
    .catch(({response}) => {
      dispatch({
        type: 'FAILED_POST_REGISTRATION',
        payload: response.data
      });
    });
  };
};

export const setLoading = (isLoading) => {
  return(dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: isLoading
    })
  };
};

export const resetErrorMessage = () => {
  return(dispatch) => {
    dispatch({
      type: 'RESET_ERROR_MESSAGE',
      payload: ''
    });
  };
};
