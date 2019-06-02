import React from 'react';
import Modal from '@material-ui/core/Modal';

const ModalBox = props => {
	return (
		<Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
        <div className="modal_container center">
          <h3>
            {props.title} 
          </h3>
          <p>
            {props.content}
          </p>
          <button className="cancel" onClick={props.handleClose}>Cancel</button>
          <button className="delete" onClick={props.handleDelete}>Delete</button>
        </div>
      </Modal>
	);
}

export default ModalBox;