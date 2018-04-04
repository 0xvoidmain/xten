import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Card from '../components/Card';
import SubActionCard from './SubActionCard';
import { speak } from '../helper';

/**
 * props
 * words, style, onStart
 */
export default class WordListCard extends React.Component {
  render() {
    var { words, style, onStart} = this.props;
    return (
      <View style={style}>
        <Card style={{paddingLeft: 0, paddingRight: 0, paddingBottom: 5}}>
          <View style={styles.borderBottom}>
            <Text style={styles.description}>
              {(`Read all words`).toLocaleUpperCase()}
            </Text>
          </View>
          {words.map((e, i) => <View
            key={e.id} style={[styles.wordContainer, i < words.length - 1 ? styles.borderBottom : null]}
            onTouchEnd={() => speak(e.en)}>
              <Text style={styles.word}>{e.en}</Text>
              <Text style={styles.wordMean}>{e.vi.split(',').join(', ')}</Text>
            </View>
          )}
        </Card>
        <SubActionCard onPress={onStart}>
          Start
        </SubActionCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  description: {
    marginBottom: 20,
    color: 'gray',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center'
  },
  wordContainer: {
    paddingTop:15,
    paddingBottom:15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  word: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
    textAlign: 'center'
  },
  wordMean: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  }
});