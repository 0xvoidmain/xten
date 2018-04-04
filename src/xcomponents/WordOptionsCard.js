import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Card from '../components/Card';
import SubActionCard from './SubActionCard';
import _ from 'lodash';
import { speak } from '../helper';

/**
 * props
 * word, lang, options, onNext, style
 */
export default class WordOptionsCard extends React.Component {

  constructor(props) {
    super();
    const { lang, word, options } = props;
    var _lang = lang == 'vi' ? 'vi' : 'en';
    const options4 = [];
    var iCorrect = _.random(0, 3);
    for (var i = 0; i < 4; i++) {
      if (i == iCorrect) {
        options4.push(word);
      }
      else {
        options4.push(options[_.random(0, options.length - 1)]);;
      }
    }
    this.state = {
      lang: _lang,
      langOption: _lang == 'vi' ? 'en' : 'vi',
      wordQuestion: this.randomPhraseText(word, _lang),
      options: options4.map(e => {
        var vi = e.vi;
        var vis = vi.split(',');
        return {
          ...e,
          vi: vis[_.random(0, vis.length - 1)],
          wrong: false,
          correct: false
        }
      })
    };
  }

  randomPhraseText(word, lang) {
    if (lang == 'en') {
      return word.en;
    }
    else {
      var vi = word.vi;
      var vis = vi.split(',');
      return vis[_.random(0, vis.length - 1)];
    }
  }

  selectOption = (e) => {
    var { word, lang } = this.props;
    var { options } = this.state;
    var isCorrect = false;
    if (lang == 'vi' ? e.en == word.en : word.vi.indexOf(e.vi) >= 0) {
      e.wrong = false;
      e.correct = true;
      isCorrect = true;
    }
    else {
      e.wrong = true;
      e.correct = false;
      isCorrect = false;

      var eCorrect = _.find(options, e => lang == 'vi' ? e.en == word.en : word.vi.indexOf(e.vi) >= 0);
      if (eCorrect) {
        eCorrect.correct = true;
      }
    }

    speak(word.en);

    this.setState({
      options: this.state.options
    });

    if (isCorrect) {
      this.props.onCorrect && this.props.onCorrect(word);
    }
    else {
      this.props.onWrong && this.props.onWrong(word);
    }
  }

  dontKnowPress = () => {
    const { word, lang } = this.props;
    const { options } = this.state;
    var eCorrect = _.find(options, e => lang == 'vi' ? e.en == word.en : word.vi.indexOf(e.vi) >= 0);
    if (eCorrect) {
      eCorrect.correct = true;
    }
    this.setState({
      options: this.state.options
    });
    speak(word.en);
    this.props.onDontKnow && this.props.onDontKnow(word);
  }

  render() {
    var { word, style} = this.props;
    var { wordQuestion, options, lang, langOption } = this.state;

    return (
      <View style={style}>
        <Card style={{
          padding: 0,
          overflow: 'hidden'
        }}>
          <View style={[styles.borderBottom, {borderBottomColor: '#e1e1e1'}]}>
            <Text style={styles.word}>{wordQuestion}</Text>
            <Text style={styles.description}>
              {(`Choose mean of word`).toLocaleUpperCase()}
            </Text>
          </View>
          {options.map((e, i) => (
            <TouchableOpacity key={i} activeOpacity={0.5}
              onPress={() => this.selectOption(e)}
              style={[styles.optionContainer, i < options.length - 1 && styles.borderBottom]}
            >
              <Text style={[styles.option,
                e.wrong && styles.optionWrong,
                e.correct && styles.optionCorrect ]}>
                {e[langOption]}
              </Text>
            </TouchableOpacity>
          ))}
        </Card>
        <SubActionCard onPress={this.dontKnowPress}>
          I don't know
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
  optionContainer: {
    backgroundColor: '#f9f9f9'
  },
  option: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  optionWrong: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    color: 'red'
  },
  optionCorrect: {
    color: '#02ad02',
    backgroundColor: 'rgba(0, 255, 0, 0.2)'
  }
});