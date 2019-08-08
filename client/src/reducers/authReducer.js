const INITIAL_STAE = {
	isSignedIn: null,
	userId: null

}

export default (state = INITIAL_STAE, action) => {
	switch (action.type) {
		case "SIGN_IN":
			return { ...state, isSignedIn: true, userId: action.payload }
		case "SIGN_OUT":
			return { ...state, isSignedIn: false, userId: null }
		default:
			return state
	}
}