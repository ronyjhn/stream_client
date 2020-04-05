import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<button onClick={() => this.onDelete(stream.id)} className="ui button negative">
						Delete
					</button>
				</div>
			);
		}
	}
	onDelete(streamId) {
		if (window.confirm('Are you sure you want to delete?')) {
			this.props.deleteStream(streamId);
		} else {
		}
	}
	renderStreams() {
		if (this.props.streams) {
			return this.props.streams.map((stream) => {
				return (
					<div className="item" key={stream.id}>
						{this.renderAdmin(stream)}
						<i className="large middle aligned icon camera" />
						<div className="content">
							<Link to={`/streams/${stream.id}`} className="header">
								{stream.title}
							</Link>
						</div>
						<div className="description">{stream.description}</div>
					</div>
				);
			});
		}
	}
	renderCreateStream() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderStreams()}</div>
				{this.renderCreateStream()}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return { streams: _.values(state.streams), currentUserId: state.auth.userId, isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { fetchStreams, deleteStream })(StreamList);
