import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setTitleAndCaption } from '../map/mapSlice';

const CommentModal = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();

  const wrappedHandleClose = () => {
    setTitle('');
    setCaption('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={wrappedHandleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a caption to your visualization.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter a title..."
            />
            <Form.Control
              as="textarea"
              className="mt-3"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              rows={8}
              placeholder="Enter a caption..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={wrappedHandleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            dispatch(setTitleAndCaption({ title, caption }));
            wrappedHandleClose();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CommentModal.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default CommentModal;
