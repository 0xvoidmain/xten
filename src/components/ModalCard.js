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
    return <Modal
      ref="modal"
      easing={Easing.elastic(0.5)}
      animationDuration={300}
      backButtonClose={true}
      swipeThreshold={70}
      {...this.props}
      style={{
        backgroundColor: 'transparent'
      }}
      >
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: '#fff',
        paddingBottom: 20,
        transform: [{
          translateY: 20
        }]
      }}>
        {this.props.children}
      </View>
    </Modal>
  }
}