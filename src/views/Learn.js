import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Easing,
  Image,
  TouchableOpacity,
  Modal,
  Animated
} from 'react-native';
import Buttom from '../components/Button';
import ChooseWords from '../views/ChooseWords';
import IconButton from '../components/IconButton';
import Practice from '../views/Practice';
import Overlay from '../components/Overlay';
import TimerComponent from '../components/TimerComponent';
import { realm, Flow, User }from '../models';
import _ from 'lodash';

const ACTIONS = Flow.ACTIONS;
export default class Learn extends TimerComponent {
  constructor() {
    super();
    this.flow = Flow.getInstance();
    this.user = User.getInstance();
    var o = realm.objects('Word');
    this.state = {
      action: this.flow.action,
      message: this.flow.message,
      numberOfWordsPerDay: this.user.numberOfWordsPerDay,
      numberWordPracticePerTime: 4,
    };
  }

  hiddenOverlay = () => {
    this.overlay.setOpacity(0, 0);
  }

  changeAction = (action) => {
    this.setState({
      action: action
    })
  }

  closePractice = () => {
    this.hiddenOverlay();
    this.setState({
      message: `You have ${this.state.numberOfWordsPerDay} words ready to practice`,
      action: ACTIONS.BEGIN_PRACTICE
    });
  }

  closeChooseWords = () => {
    this.hiddenOverlay();
    this.setState({
      message: `Let's choose ${this.state.numberOfWordsPerDay} words to learn today`,
      action: ACTIONS.BEGIN_CHOOSE_WORDS
    });
  }

  doneChooseWords = () => {
    this.hiddenOverlay();
    this.setState({
      message: `You have ${this.state.numberOfWordsPerDay} ready to learn`,
      action: ACTIONS.BEGIN_PRACTICE
    });
    realm.write(() => {
      this.flow.message = `You have ${this.state.numberOfWordsPerDay} ready to learn`;
      this.flow.action = ACTIONS.BEGIN_PRACTICE
    });
  }

  donePractice = () => {
    this.hiddenOverlay();
    this.setState({
      message: `Let's choose ${this.state.numberOfWordsPerDay} words to practice`,
      action: ACTIONS.BEGIN_CHOOSE_WORDS
    });
  }

  getStart = () => {
    this.setState({
      message: `Let's choose ${this.state.numberOfWordsPerDay} words to practice`,
      action: ACTIONS.BEGIN_CHOOSE_WORDS
    });

    realm.write(() => {
      this.flow.message = `Let's choose ${this.state.numberOfWordsPerDay} words to practice`;
      this.flow.action = ACTIONS.BEGIN_CHOOSE_WORDS;
    });
  }

  renderFlowControler() {
    const { message, action } = this.state;
    const  ACTIONS = Flow.ACTIONS;
    var btnText = "";
    var func = () => {};

    switch(action) {
      case ACTIONS.BEGIN_CHOOSE_WORDS:
        btnText = `Begin`;
        func = () => this.changeAction(ACTIONS.CHOOSE_WORDS);
        break;
      case ACTIONS.BEGIN_PRACTICE:
        btnText = `Let's start`;
        func = () => this.changeAction(ACTIONS.PRACTICE);
        break;
      case ACTIONS.GET_START:
        btnText = `Let's start`;
        func = () => this.getStart();
        break;
    }

    return ( btnText ?
      <View style={styles.msgContainer}>
        <Text style={styles.msg}>{message}</Text>
        <Buttom width={150} onPress={() => func()}>
          {btnText}
        </Buttom>
      </View> : null
    )
  }

  renderView() {
    const { action, numberWordPracticePerTime, stepPractice } = this.state;
    const ACTIONS = Flow.ACTIONS;
    return (
      action == ACTIONS.PRACTICE ? <Practice style={styles.modalView}
        numberWordsPerTime={numberWordPracticePerTime}
        step={stepPractice}
        onClose={this.closePractice}
        onDone={this.donePractice}/> :
      action == ACTIONS.CHOOSE_WORDS ? <ChooseWords style={styles.modalView}
        onClose={this.closeChooseWords}
        onDone={this.doneChooseWords}/> :
      null
    );
  }

  isShowModal() {
    const { action } = this.state;
    return action == ACTIONS.CHOOSE_WORDS ||
      action == ACTIONS.PRACTICE;
  }

  render() {
    const { message, action } = this.state;
    return (
    <View style={styles.main}>
      {this.renderFlowControler()}
      <Modal visible={this.isShowModal()} animationType='slide' transparent={true}>
        <Overlay ref={e => this.overlay = e} opacity={0.4} delay={300} />
        {this.renderView()}
      </Modal>
    </View>);
  }
}

const styles = StyleSheet.create({
  msgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40%'
  },
  msg: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '300',
    backgroundColor: 'transparent'
  },
  modalView: {
    flex: 1,
    paddingTop: '30%'
  },
  main: {
    flex: 1
  }
})