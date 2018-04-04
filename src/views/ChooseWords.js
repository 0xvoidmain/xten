import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';

import Card from '../components/Card';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import IconButton from '../components/IconButton';
import WordCard from '../xcomponents/WordCard';
import TimerComponent from '../components/TimerComponent';
import { speak } from '../helper';
import { realm , Flow, User, Word } from '../models';
import _ from 'lodash';

const window = Dimensions.get('window');

export default class ChooseWords extends TimerComponent {
  constructor() {
    super();
    this.user = User.getInstance();
    this.flow = Flow.getInstance();
    this.state = {
      total: this.user.numberOfWordsPerDay,
      selectWords: [],
      words: realm
        .objects('Word')
        .filter(e => e.practice == Word.PRACTICE_LEVEL.NONE)
        .sort(() => Math.random() - 0.5)
    }
    this.pageNum = 0
  }

  select = (e) => {
    const { total, selectWords } = this.state;
    const word = e.item;
    selectWords.push(word);
    if (selectWords.length >= total) {
      this.next(e);
    }
    else {
      this.setState({
        selectWords: selectWords
      });
      this.next(e);
    }
  }
  remove = (e) => {
    const { total, selectWords } = this.state;
    const word = e.item;
    const i = selectWords.indexOf(word);
    selectWords.splice(i, 1);
    if (selectWords.length >= total) {
      this.next(e);
    }
    else {
      this.setState({
        selectWords: selectWords
      });
      this.next(e);
    }
  }

  knowIt = (e) => {
    const word = e.item;
    realm.write(() => {
      let w = realm.objectForPrimaryKey('Word', word.id);
      w.knowIt = true;
      w.practice = Word.PRACTICE_LEVEL.MONTH;
    });
    this.next(e);
  }

  next = (e) => {
    const { selectWords, total, words } = this.state;
    if (selectWords.length >= total) {
      realm.write(() => {
        this.flow.wordsLearn.splice(0, this.flow.wordsLearn.length);
        selectWords.forEach(e => {
          let word = realm.objectForPrimaryKey('Word', e.id);
          word.practice = Word.PRACTICE_LEVEL.BEGIN;
          this.flow.wordsLearn.push(word);
        });
      });
      this.props.onDone && this.props.onDone();
    }
    else if (e.index < words.length - 1) {
      this.refs.list && this.refs.list.scrollToIndex({ index: e.index + 1 });
    }
  }

  momentumScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (this.pageNum != pageNum) {
      const word = this.state.words[pageNum];
      if (word) {
        speak(word.en);
      }
      this.pageNum = pageNum;
    }
  }

  componentDidMount() {
    this.setTimeout(() => {
      speak(this.state.words[0].en);
    }, 700);
  }

  render() {
    const { style, onClose } = this.props;
    const { selectWords, total, words } = this.state;
    return (
      <View style={[{ alignItems: 'center' }, style]}>
        <FlatList
          ref="list"
          initialNumToRender={1}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.momentumScrollEnd}
          onViewableItemsChanged={this.viewableItemsChanged}
          data={words}
          keyExtractor={e => e.id}
          getItemLayout={(data, index) => ({
            length: window.width,
            offset: window.width * index,
            index: index
          })}
          extraData={this.state}
          renderItem={(e) => <WordCard word={e.item}
            number={selectWords.length}
            total={total}
            style={styles.wordCard}
            onSelect={() => this.select(e)}
            onRemove={() => this.remove(e)}
            onKnowIt={() => this.knowIt(e)} />
          }
        />
        <IconButton icon={require('../resources/close.png')}
          color="rgba(255, 255, 255, 0.3)"
          size={40}
          style={{ marginBottom: 20, padding: 12 }}
          onPress={onClose} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wordCard: {
    width: window.width - 60,
    marginLeft: 30,
    marginRight: 30
  }
});