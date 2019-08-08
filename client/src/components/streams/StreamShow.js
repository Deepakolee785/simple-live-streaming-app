import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import flv from 'flv.js'
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {

	constructor(props) {
		super(props)

		this.videoRef = React.createRef()
	}

	componentDidMount() {
		const { id } = this.props.match.params
		this.props.fetchStream(id)

		this.buildPlayer()
	}
	componentDidUpdate(){
		this.buildPlayer()
	}
	componentWillUnmount(){
		this.player.destroy()
	}

	buildPlayer() {
		
		if (this.player || !this.props.stream) {
			return;
		}

		const { id } = this.props.match.params
		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${id}.flv`
		})
		this.player.attachMediaElement(this.videoRef.current)
		this.player.load()

	}



	render() {

		if (!this.props.stream) {
			return <div>Loading...</div>
		}

		const { title, description } = this.props.stream

		return (
			<div>
				<video ref={this.videoRef} style={{ width: '100%' }} controls />
				<h1>{title}</h1>
				<h5>{description}</h5>

			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)


// const StreamShow = (props) => {

// 	let videoRef = React.createRef()

// 	let  buildPlayer = () => {
// 		const { id } = props.match.params
// 		let player = flv.createPlayer({
// 			type: 'flv',
// 			url: `http://localhost:8000/live/${id}.flv`
// 		})
// 		if(player || !props.stream){
// 			return
// 		}
// 		player.attachMediaElement(videoRef.current)
// 		player.load()

// 	}

// 	useEffect(() => {
// 		const { id } = props.match.params
// 		props.fetchStream(id)

// 		buildPlayer()

// 	})


// 	if (!props.stream) {
// 		return <div>Loading...</div>
// 	}

// 	const { title, description } = props.stream

// 	return (
// 		<div>
// 			<video ref={videoRef} style={{ width: '100%' }} controls />
// 			<h1>{title}</h1>
// 			<h5>{description}</h5>

// 		</div>
// 	)
// }