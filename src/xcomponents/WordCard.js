import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import IconButton from '../components/IconButton';
import TimerComponent from '../components/TimerComponent';
import SubActionCard from './SubActionCard';
import { speak } from '../helper';

/**
 * props
 * word, number, total, style
 */
export default class WordCard extends TimerComponent {

  constructor() {
    super();
    this.state = {
      isChoose: false
    };
  }

  toggleChoose = () => {
    const { isChoose } = this.state;
    const { word, onRemove, onSelect } = this.props;
    this.setTimeout(() => {
      this.setState({
        isChoose: !isChoose
      });
    }, 300);
    if (isChoose) {
      onRemove && onRemove(word);
    }
    else {
      onSelect && onSelect(word);
    }
  }

  render() {
    var { word, style, number, total, onKnowIt } = this.props;
    var { isChoose } = this.state;
    var sizeOfWord = 35;
    var lengthOfWord = word.en.length;
    if (lengthOfWord >= 15) {
      sizeOfWord = 20;
    }
    else if (lengthOfWord >= 10) {
      sizeOfWord = 25;
    }
    return (
      <View style={style}>
        <Card style={{
          alignItems: 'center',
          padding: 25
        }}>
          <Text style={styles.description}>
            {(`Choosed ${number} in ${total}`).toLocaleUpperCase()}
          </Text>
          <Text style={[styles.word, {fontSize: sizeOfWord}]}>{word.en}</Text>
          <Text style={styles.wordMean}>
            {word.vi.split(',').slice(0, 2).join(', ')}
          </Text>
          <IconButton icon={require('../resources/speaker.png')}
            onPress={() => speak(word.en)}
            onLongPress={() => speak(word.en, 0.25)}/>
          <Button style={isChoose ? styles.btnRemove :  styles.btnLearn}
            textStyle={{color: isChoose ? 'rgba(255, 0, 0, 0.5)' : '#fff'}}
            onPress={this.toggleChoose}
            type='outline'>
            {isChoose ? 'Remove' : 'Learn'}
          </Button>
        </Card>
        <SubActionCard onPress={() => onKnowIt && onKnowIt(word)}>
          I know it
        </SubActionCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 40,
    color: 'gray',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 1,
  },
  word: {
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    minHeight: 45
  },
  wordMean: {
    minHeight: 48,
    color: 'gray',
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 20,
    textAlign: 'center'
  },
  btnLearn: {
    backgroundColor: '#1fc88d',
    width: 150,
    marginTop: 25
  },
  btnRemove: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: 150,
    marginTop: 25
  }
});