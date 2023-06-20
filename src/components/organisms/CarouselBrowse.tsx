import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../theme/colors';
import {Image, Stack, Text} from 'native-base';
import {CarouselBrowseItem, EventGlassmorphisem} from '../molecules';
import TouchableIcon from '../atoms/TouchableIcon';

const WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = Math.round(WIDTH * 0.92);
const ITEM_WIDTH = Math.round(WIDTH * 0.9);
const ITEM_HEIGHT = 200;

const DATA: number[] = [];
for (let i = 0; i < 4; i++) {
  DATA.push(i);
}

export class CarouselBrowse extends Component {
  state = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({item}) {
    return <CarouselBrowseItem item={item} />;
  }

  get pagination() {
    return (
      <Pagination
        dotsLength={this?.props?.Data?.length}
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
    const {Data} = this?.props;
    return (
      <View>
        <Carousel
          ref={c => (this.carousel = c)}
          data={Data}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          activeSlideAlignment={'center'}
          onSnapToItem={index => this.setState({index})}
          useScrollView={true}
          layout={'tinder'}
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
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
    height: 61,
    position: 'absolute',
    right: '25%',
    bottom: -45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
