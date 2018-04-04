import tts from 'react-native-tts';
import { sound } from '../settings';

export function speak(text, rate) {
  if (!sound()) {
    return;
  }
  if (typeof text === 'string') {
    tts.stop();
    if (rate) {
      tts.setDefaultRate(rate);
    }
    else {
      tts.setDefaultRate(0.5);
    }
    tts.speak(text);
  }
}