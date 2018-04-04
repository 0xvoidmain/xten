import React from 'react';
import {
  Animated,
  StyleSheet
} from 'react-native';

export default class Overlay extends React.PureComponent {
  constructor(props) {
    super();
    this.state = {
      opacity: new Animated.Value(props.initOpacity >= 0 ? props.initOpacity : 0)
    }
  }
  setOpacity(v, duration) {
    if (duration == 0) {
      this.state.opacity.setValue(0);
    }
    else {
      Animated.timing(this.state.opacity, { toValue: v, duration: duration || 400}).start();
    }
  }

  componentDidMount() {
    var { opacity, duration, delay } = this.props;
    if (opacity >= 0) {
      Animated.timing(this.state.opacity, { toValue: opacity, duration: duration || 400, delay: delay || 0}).start();
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.opacity >= 0 && newProps.opacity !== this.props.opacity) {
      var duration = newProps.duration || this.props.duration;
      Animated.timing(this.state.opacity, { toValue: newProps.opacity, duration: duration || 400}).start();
    }
  }
  render() {
    return <Animated.View style={[styles.overlay, {opacity: this.state.opacity}]}></Animated.View>
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black'
  }
});