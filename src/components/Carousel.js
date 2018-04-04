import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import CarouselCore from 'react-native-snap-carousel';

const window = Dimensions.get('screen');
function wp(percentage) {
  const value = (percentage * window.width) / 100;
  return Math.round(value);
}
export default class Carousel extends React.PureComponent {
  next() {
    this.refs.carousel.snapToNext();
  }
  render() {
    var { margin, slideWidth, items, children, ...rest} = this.props;
    margin = margin || 5;
    slideWidth = slideWidth || wp(75);
    const sliderWidth = window.width;
    const itemWidth = slideWidth + margin * 2;
    items = items || children;
    if (!Array.isArray(items)) {
      items = [items];
    }
    return (
      <CarouselCore
        ref="carousel"
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        snapOnAndroid={true}
        inactiveSlideScale={1}
        {...rest}>
        {
          items.map((e, i) => (
            <View key={i} style={{
              width: itemWidth,
              paddingHorizontal: margin }}>
                {e}
            </View>
          ))
        }
      </CarouselCore>
    )
  }
}