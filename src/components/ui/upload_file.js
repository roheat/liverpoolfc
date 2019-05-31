import React from 'react';
import FileUploader from "react-firebase-file-uploader";
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebase } from '../../firebase';

class UploadFile extends React.Component {
	
	state = {
		name: '',
		isUploading: false,
		fileURL: ''
	};

	static getDerivedStateFromProps(props, state) {
		if(props.defaultImg) {
			return state = {
				name: props.defaultImgName,
				fileURL: props.defaultImg 
			}
		}
		return null;
	}

	handleUploadStart = () => {
		this.setState({ isUploading: true });
	}

	handleUploadError = () => {
		this.setState({ isUploading: false });
	}

	handleUploadSuccess = (filename) => {
		this.setState({
			name: filename,
			isUploading: false
		});

		firebase
		.storage()
		.ref(this.props.dir)
		.child(filename)
		.getDownloadURL()
		.then(url => {
			this.setState({ fileURL: url })
		});

		this.props.filename(filename);
	}

	removeImage = (filename) => {
		firebase
		.storage()
		.ref(this.props.dir)
		.child(filename)
		.delete()
		.then(() => {
			this.props.resetImage();
			this.setState({
				name: '',
				isUploading: false,
				fileURL: ''
			});
		})
	}

	render() {
		return (
			<div>
				{
					!this.state.fileURL ?
					<div>
						<div className="label_input">{this.props.tag}</div>
						<FileUploader 
							accept="image/*"
							name="image"
							randomizeFilename
							storageRef={firebase.storage().ref('players')}
							onUploadStart={this.handleUploadStart}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
						/>
					</div>
					: null
				}
				{
					this.state.isUploading ?
					<div className="progress" style={{ textAlign: 'center', margin: '30px 0px' }}>
						<CircularProgress thickness={7} style={{ color: '#E31B23' }} />
					</div>
					: null
				}
				{
					this.state.fileURL ?
					<div className="image_upload_container">
						<img 
							style={{ width: '100%' }}
							src={this.state.fileURL}
							alt={this.state.name}
						/>
						<div className="remove" onClick={() => this.removeImage(this.state.name)}>
							Remove
						</div>
					</div>
					: null
				}
			</div>
		);
	}
}

export default UploadFile;