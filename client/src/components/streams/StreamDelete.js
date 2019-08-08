import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

const StreamDelete = (props) => {

	useEffect(() => {
		props.fetchStream(props.match.params.id)
	}, [])

	const actions = (
		<Fragment>
			<button 
				className="ui button negative"
				onClick={() => props.deleteStream(props.match.params.id)}
				>
				Delete
			</button>
			<Link to="/"className="ui button">Cancel</Link>
		</Fragment>
	)

	const renderContent = () => {
		if (!props.stream) {
			return 'Are you sure you want to delete the stream?'
		}
		return `Are you sure you want to delete the stream with title: ${props.stream.title}`

	}

	return <Modal
		title="Delete Stream"
		content={renderContent()}
		actions={actions}
		onDimiss={() => history.push('/')}
	/>
}
const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)