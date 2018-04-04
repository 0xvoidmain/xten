import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import TimerComponent from '../components/TimerComponent';
import IconButton from '../components/IconButton';
import Card from '../components/Card';
import SubActionCard from './SubActionCard';
import { speak } from '../helper';
import _ from 'lodash';

/**
 * props
 * word, style, focus
 */
export default class WordListenCard extends TimerComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      wrong: false,
      correct: false,
      mainWord: this.randomPhrase(props.word)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.focus !== this.props.focus && newProps.focus == true) {
      this.refs.input.focus();
    }
  }

  randomPhrase(word) {
    var vi = word.vi;
    var vis = vi.split(',');
    return vis[_.random(0, vis.length - 1)];
  }

  endEditing = () => {
    var { value } = this.state;
    var { word } = this.props;
    value = value && value.trim()
    value = value && value.toLocaleLowerCase();
    if (value) {
      if (value == word.en.toLocaleLowerCase()) {
        this.setState({
          correct: true
        });
        this.props.onCorrect && this.props.onCorrect(word);
      }
      else {
        this.setState({
          wrong: true
        });

        this.props.onWrong && this.props.onWrong(word);
      }
      // speak(word.en);
    }
  }

  subActionPress = () => {
    if (this.state.value && this.state.value.trim()) {
      this.endEditing();
    }
    else {
      var { word } = this.props;
      // speak(word.en);
      this.setState({
        value: word.en,
        correct: true
      });
      this.props.onDontKnow && this.props.onDontKnow(word);
    }
  }

  render() {
    var { word, style} = this.props;
    var { mainWord, value, wrong, correct } = this.state;
    return (
      <View style={style}>
        <Card style={{
          padding: 0,
          overflow: 'hidden'
        }}>
          <View style={[styles.borderBottom, {borderBottomColor: '#e1e1e1', alignItems: 'center', paddingTop: 10}]}>
            <IconButton icon={require('../resources/speaker.png')}
              onPress={() => speak(word.en)}
              onLongPress={() => speak(word.en, 0.25)}/>
            <Text style={[styles.description, wrong && { color: '#02ad02'}, {paddingTop: 25}]}>
              {(wrong ? word.en : 'Listen and type word').toLocaleUpperCase()}
            </Text>
          </View>
          <View>
            <TextInput
              ref="input"
              autoCorrect={false}
              returnKeyType="done"
              blurOnSubmit={true}
              style={[styles.input, wrong && styles.inputWrong, correct && styles.inputCorrect ]}
              onChangeText={v => this.setState({value: v})}
              onSubmitEditing={this.endEditing}
              placeholder="Type here"
              value={value.toLowerCase()} />
          </View>
        </Card>

        <SubActionCard onPress={this.subActionPress}>
          {value.length > 0 ? 'Answer' : 'I don\'t know'}
        </SubActionCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9'
  },
  description: {
    marginBottom: 25,
    color: 'gray',
    fontWeight: '600',
    fontSize: 11,
    textAlign: 'center'
  },
  word: {
    fontSize: 30,
    color: '#333',
    marginTop: 25,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
  },
  input: {
    height: 100,
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  inputWrong: {
    color: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  inputCorrect: {
    color: '#02ad02',
    backgroundColor: 'rgba(0, 255, 0, 0.1)'
  },
  answer: {
    color: '#02ad02',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    paddingBottom: 15,
    borderRadius: 5
  }
});