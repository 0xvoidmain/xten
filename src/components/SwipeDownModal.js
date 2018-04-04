import React from 'react';
import {
  View,
  Easing
} from 'react-native';
import Modal from 'react-native-modalbox';

export default class ModalCard extends React.PureComponent {

  open() {
    this.refs.modal.open();
  }

  close() {
    this.refs.modal.close();
  }

  render() {
    const { style, children, ...rest } = this.props;
    return <Modal
      ref="modal"
      easing={Easing.elastic(0.5)}
      animationDuration={300}
      backButtonClose={true}
      swipeThreshold={70}
      {...rest}
      style={[{
        backgroundColor: 'transparent'
      }, style]}
      >
        {this.props.children}
    </Modal>
  }
}