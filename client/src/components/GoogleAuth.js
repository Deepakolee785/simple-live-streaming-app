import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends Component {

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '739436151937-61istj79mochhe09npda1vkb94lh8qdt.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance()
				this.onAuthChange(this.auth.isSignedIn.get())
				this.auth.isSignedIn.listen(this.onAuthChange)
			})
		})
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId())
		} else {
			this.props.signOut()
		}
	}


	onSignInClick = () => {
		this.auth.signIn()
	}

	onSignOutClick = () => {
		this.auth.signOut()
	}


	 renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null
		} else if (this.props.isSignedIn) {
			return (
				<button
					style={{ marginTop: '1rem' }}
					className="ui red google button"
					onClick={this.onSignOutClick}>
					<i className="google icon" />
					Sign Out
				</button>
			)
		} else {
			return (
				<button
					style={{ marginTop: '1rem' }}
					className="ui red google button"
					onClick={this.onSignInClick}>
					<i className="google icon" />
					Sign In with Google
				</button>
			)
		}
	}


	render() {
		return (
            <div>{this.renderAuthButton()}</div>
        );
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)









/*

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

const GoogleAuth = (props) => {
	const [auth, setAuth] = useState(null)

	const gapiInit = () => {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '739436151937-61istj79mochhe09npda1vkb94lh8qdt.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				let auth = window.gapi.auth2.getAuthInstance()
				setAuth(auth)
				onAuthChange(auth.isSignedIn.get())
				auth.isSignedIn.listen(onAuthChange)
			})
		})
	}

	useEffect(() => {
		gapiInit()
	}, [])

	let onAuthChange = (isSignedIn) => {
		console.log(auth)
		if (isSignedIn && auth) {
			props.signIn(auth.currentUser.get().getId())
			console.log(auth.currentUser)
		} else {
			props.signOut()
		}
	}

	const onSignInClick = () => {
		auth.signIn()
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '739436151937-61istj79mochhe09npda1vkb94lh8qdt.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				let auth = window.gapi.auth2.getAuthInstance()
				setAuth(auth)
				onAuthChange(auth.isSignedIn.get())
				auth.isSignedIn.listen(onAuthChange)
			})
		})

	}

	const onSignOutClick = () => {
		auth.signOut()
	}



	const renderAuthButton = () => {
		if (props.isSignedIn === null) {
			return null
		} else if (props.isSignedIn) {
			return (
				<button
					style={{ marginTop: '1rem' }}
					className="ui red google button"
					onClick={onSignOutClick}>
					<i className="google icon" />
					Sign Out
				</button>
			)
		} else {
			return (
				<button
					style={{ marginTop: '1rem' }}
					className="ui red google button"
					onClick={onSignInClick}>
					<i className="google icon" />
					Sign In with Google
				</button>
			)
		}
	}



	return (
		<div>{renderAuthButton()}</div>
	)
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)


*/