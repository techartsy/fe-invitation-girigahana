const initialState = {
  participants : [],
  errorMessage: null,
  isLoading: false,
  status: ''
}

export default function invitationReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PARTICIPANTS':
      return { ...state, participants: state.participants = action.payload};
    case 'POST_REGISTRATION':
      return { ...state,
        participants: state.participants.concat(action.payload),
        status: state.status = 'success',
      }
    case 'FAILED_POST_REGISTRATION':
      return { ...state, errorMessage: state.errorMessage = action.payload.message}
    case 'SET_LOADING':
      return { ...state, isLoading: state.isLoading = action.payload}
    case 'RESET_ERROR_MESSAGE':
      return { ...state, errorMessage: state.errorMessage = ''};
    default:
      return state;
  }
};
