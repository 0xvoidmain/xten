import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Keyboard,
  Animated
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import TimerComponent from '../components/TimerComponent';
import WordListCard from '../xcomponents/WordListCard';
import WordTypeCard from '../xcomponents/WordTypeCard';
import WordOptionsCard from '../xcomponents/WordOptionsCard';
import WordListenCard from '../xcomponents/WordListenCard';
import { realm, Flow } from '../models';
import { speak } from '../helper';
import _ from 'lodash';

const window = Dimensions.get('window');

export default class Practice extends TimerComponent {
  constructor(props) {
    super();
    this.cardInput = [];
    this.flow = Flow.getInstance();
    this.numberWordsPerTime = props.numberWordsPerTime || 4;
    const wordsLearn = this.flow.wordsLearn.map(e => ({
      id: e.id,
      en: e.en,
      vi: e.vi
    }));

    this.state = {
      opacity: new Animated.Value(1),
      numberStep: Math.round(wordsLearn.length / this.numberWordsPerTime + 0.5),
      step: 0,
      scrollEnabled: true,
      words: wordsLearn,
      options: this.getOptions(wordsLearn),
      practiceItems: this.createPracticeStep(wordsLearn, 0)
    }
  }

  getOptions(wordsLearn) {
    var filter = {};
    wordsLearn.forEach(e => filter[e.id] = true);
    var options = realm.objects('Word')
      .filter(e => !filter[e.id])
      .slice(0, wordsLearn.length * 10)
      .map(e => ({
        id: e.id,
        en: e.en,
        vi: e.vi
      }));
    return options;
  }

  createOption(words, lang, key) {
    var practiceOption = [];
    words.forEach(e => {
      practiceOption.push({
        type: 'option',
        key: key + e.id,
        word: e,
        lang: lang
      });
    });
    return practiceOption;
  }

  createType(words, key) {
    var practiceOption = [];
    words.forEach(e => {
      practiceOption.push({
        type: 'type',
        key: key + e.id,
        word: e,
        focus: false
      });
    });
    return practiceOption;
  }

  createListen(words, key) {
    var practiceOption = [];
    words.forEach(e => {
      practiceOption.push({
        type: 'listen',
        key: key + e.id,
        word: e,
        focus: false
      });
    });
    return practiceOption;
  }

  createPracticeStep(wordsLearn, step) {
    var words = wordsLearn.slice(step * this.numberWordsPerTime, (step + 1) * this.numberWordsPerTime);
    var result = [{
      key: 'list',
      type: 'listwords',
      words: words
    }];

    result = result.concat(_.shuffle(this.createOption(words, 'en', 'en1')));
    result = result.concat(_.shuffle(this.createOption(words, 'vi', 'vi1')));
    result = result.concat(_.shuffle(
      _.flatten([
        this.createOption(words, 'vi', 'vi2'),
        this.createOption(words, 'en', 'en2')
      ])
    ));
    result = result.concat(_.shuffle(
      _.flatten([
        this.createType(words, 'type1'),
        // this.createType(words, 'type2')
      ])
    ));
    result = result.concat(_.shuffle(
      _.flatten([
        this.createListen(words, 'listen1'),
        this.createListen(words, 'listen2')
      ])
    ));

    return result;
  }

  next = (e, delay = 700) => {
    if (e.index < this.state.practiceItems.length - 1) {
      this.setTimeout(() => {
        this.refs.list && this.refs.list.scrollToIndex({index: e.index + 1});
      }, delay);
    }
    else {
      this.setTimeout(() => {
        this.nextStep();
      }, 1000);
    }
  }

  nextStep = () => {
    var nextStep = this.state.step + 1;
    if (nextStep >= this.state.numberStep - 1) {
      this.props.onDone && this.props.onDone();
    }
    else {
      Animated.timing(this.state.opacity, { toValue: 0, duration: 300 }).start();
      this.setTimeout(() => {
        this.refs.list && this.refs.list.scrollToIndex({index: 0});
        this.setState({
          scrollEnabled: true,
          step: nextStep,
          practiceItems: this.createPracticeStep(this.state.words, nextStep)
        });
        this.setTimeout(() => {
          Animated.timing(this.state.opacity, { toValue: 1, duration: 300 }).start();
        }, 300);
      }, 300);
    }
  }

  correct = (e) => {
    const word = e.item.word;
    realm.write(() => {
      const e = realm.objectForPrimaryKey('Word', word.id);
      e.nextPractice();
    });
    this.next(e);
  }

  wrong = (e) => {
    this.next(e);
  }

  dontKnow = (e) => {
    this.next(e);
  }

  momentumScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (pageNum > 0) {
      this.setState({
        scrollEnabled: false
      });
      // Keyboard.dismiss();
    }

    if (this.pageNum != pageNum) {
      const item = this.state.practiceItems[pageNum];
      const preItem = this.state.practiceItems[pageNum - 1];
      if (item.type == 'listen') {
        speak(item.word.en);
      }
      if (item.type == 'listen' || item.type == 'type') {
        item.focus = true;
        if (preItem && (preItem.type == 'listen' || preItem.type == 'type')) {
          preItem.focus = false;
        }

        this.forceUpdate();
      }
      else {
        Keyboard.dismiss();
      }
      this.pageNum = pageNum;
    }
  }

  render() {
    const { style, onClose } = this.props;
    const { options, practiceItems, opacity } = this.state;
    return (
      <Animated.View style={[{alignItems: 'center'}, style, {opacity: opacity}]}>
        <FlatList
          ref="list"
          keyboardShouldPersistTaps='handled'
          initialNumToRender={1}
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={this.momentumScrollEnd}
          scrollEnabled={this.state.scrollEnabled}
          showsHorizontalScrollIndicator={false}
          data={practiceItems}
          keyExtractor={e => e.key}
          getItemLayout={(data, index) => ({
            length: window.width,
            offset: window.width * index,
            index: index
          })}
          extraData={this.state}
          renderItem={e => (
            e.item.type == 'listwords' ?
              <WordListCard
                words={e.item.words}
                style={styles.card}
                onStart={() => this.next(e, 0)}/> :
            e.item.type == 'option' ?
              <WordOptionsCard
                word={e.item.word}
                lang={e.item.lang}
                options={options}
                style={styles.card}
                onCorrect={() => this.correct(e)}
                onWrong={() => this.wrong(e)}
                onDontKnow={() => this.dontKnow(e)} /> :
            e.item.type == 'type' ?
              <WordTypeCard
                word={e.item.word}
                style={styles.card}
                focus={e.item.focus}
                onCorrect={() => this.correct(e)}
                onWrong={() => this.wrong(e)}
                onDontKnow={() => this.dontKnow(e)} /> :
              <WordListenCard
                word={e.item.word}
                style={styles.card}
                focus={e.item.focus}
                onCorrect={() => this.correct(e)}
                onWrong={() => this.wrong(e)}
                onDontKnow={() => this.dontKnow(e)} />
          )}
        />
        <IconButton icon={require('../resources/close.png')}
          color="rgba(255, 255, 255, 0.3)"
          size={40}
          style={{marginBottom: 20, padding: 12}}
          onPress={() => onClose && onClose()}/>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  card: {
    width: window.width - 60,
    marginLeft: 30,
    marginRight: 30
  }
});