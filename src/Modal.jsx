import { Component } from 'react';
import { createPortal } from 'react-dom';
import { element } from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.modalRoot = document.getElementById('modal-root');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return createPortal(children, this.modalRoot);
  }
}

Modal.propTypes = {
  children: element.isRequired,
};

export default Modal;
