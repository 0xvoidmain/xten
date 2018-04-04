import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Easing,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import SlideMenu from 'react-native-side-menu';
import Menu from '../../components/Menu';
import ModalCard from '../../components/ModalCard';
import Buttom from '../../components/Button';
import Card from '../../components/Card';
import IconButton from '../../components/IconButton';
import Learn from '../../views/Learn';
import MenuItems from './MenuItems';
import Header from './Header';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      isHiddenStatusBar: false
    }
  }
  openModal = () => {
    this.modal.open();
  }
  openMenu = () => {
    this.setState({
      isMenuOpen: true
    });
  }
  onMenuChange = (isOpen) => {
    this.setState({
      isMenuOpen: isOpen,
      isHiddenStatusBar: false
    });
  }
  onMenuMove = (isMove) => {
    this.setState({
      isHiddenStatusBar: true
    });
  }

  render() {
    return (
      <Menu isOpen={this.state.isMenuOpen} onChange={this.onMenuChange} disableGestures={true} menu={<MenuItems />}>
        <Image style={styles.background} source={require('../../resources/background2.jpg')}>
          <StatusBar barStyle="light-content" hidden={this.state.isMenuOpen || this.state.isHiddenStatusBar} />
          <Header onOpenMenu={this.openMenu} onOpenModal={this.openModal} />
          <Learn />
          <ModalCard ref={e => this.modal = e} />
        </Image>
      </Menu>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  }
})