import React, {Component} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../theme/colors';
import {Image, Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import {ApiImage} from '..';

const WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = Math.round(WIDTH * 0.92);
const ITEM_WIDTH = Math.round(WIDTH * 0.9);
const ITEM_HEIGHT = 170;

export class ProductCarousel extends Component {
  state = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({item}) {
    return (
      <View style={styles.itemContainer}>
        <ApiImage
          imageUrl={item?.url}
          style={{width: '100%', height: 170}}
          resizeMode="contain"
        />
      </View>
    );
  }

  get pagination() {
    return (
      <Pagination
        dotsLength={this?.props?.images?.length}
        activeDotIndex={this.state.index}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
          marginTop: 8,
        }}>
        <Carousel
          ref={c => (this.carousel = c)}
          data={this?.props?.images}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          activeSlideAlignment={'center'}
          onSnapToItem={index => this.setState({index})}
          useScrollView={true}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 16,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 1,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 61,
  },
  paginationDot: {
    width: 14,
    height: 7,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: -50,
  },
  paginationInactive: {
    marginHorizontal: -50,
    borderRadius: 5,
    width: 10,
    height: 10,
  },
});
