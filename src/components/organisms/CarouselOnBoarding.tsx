import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../theme/colors';
import {Box, Button, HStack, Image, Stack, Text, VStack} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../theme/fonts';
import {GetStartedButton, SkipButton} from '../atoms';
import rightArrow from '../../assets/icons/right_arrow.png';

const WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = WIDTH;
const ITEM_WIDTH = WIDTH;
const ITEM_HEIGHT = 170;

// const DATA: number[] = [];
// for (let i = 0; i < 3; i++) {
//   DATA.push(i);
// }

interface Props {
  image: string;
  title: string;
  body: string;
}

const DATA: Props[] = [
  {
    image: require('../../assets/images/onboarding1.png'),
    title: 'No More Medicine Hassle.',
    body: 'Upload prescriptions and locate near-by pharmacies that meet your needs with ease.',
  },
  {
    image: require('../../assets/images/onboarding2.png'),
    title: 'Treat Yourself Well.',
    body: 'Browse and buy curated bundles of personal-care products with exclusive discounts!',
  },
  {
    image: require('../../assets/images/onboarding3.png'),
    title: 'Connect with Wellness Places.',
    body: 'Discover nearby gyms, spas, wellness classes & events in your area.',
  },
];

export class CarouselOnBoarding extends Component {
  state = {
    index: 0,
  };

  constructor(props: any) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({item}: any) {
    return (
      <View
        style={
          this.state.index !== 2 ? styles.itemContainer : styles.itemContainer2
        }>
        {this.state.index !== 2 && <SkipButton />}
        <Image
          source={item.image}
          alt="Alternate Text"
          w={'100%'}
          h={396}
          resizeMode={'cover'}
          borderRadius={8}
        />
        <VStack pb={3} mb={16} space={1}>
          <Text style={fonts.heading3} pt={4} lineHeight={45}>
            {item.title}
          </Text>
          <Text style={fonts.body1}>{item.body}</Text>
        </VStack>
      </View>
    );
  }

  get pagination() {
    return (
      <Stack
        direction={this.state.index === 2 ? 'column-reverse' : 'row'}
        w={'100%'}
        position={'absolute'}
        left={-15}
        bottom={-25}
        justifyContent={'space-between'}
        alignItems={this.state.index === 2 ? 'flex-start' : 'center'}
        px={2}>
        <Pagination
          dotsLength={DATA?.length}
          activeDotIndex={this.state.index}
          dotStyle={styles.paginationDot}
          inactiveDotStyle={styles.paginationInactive}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        {this.state.index === 2 ? (
          <GetStartedButton />
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.carousel.snapToNext();
            }}>
            <LinearGradient
              style={styles.next}
              colors={[colors.gradient1, colors.gradient2]}>
              <Image
                source={rightArrow}
                alt="Right Arrow"
                boxSize={7}
                resizeMode={'cover'}
              />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </Stack>
    );
  }

  render() {
    return (
      <View>
        <Carousel
          ref={c => (this.carousel = c)}
          data={DATA}
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
  carouselContainer: {},
  itemContainer: {
    paddingHorizontal: 16,
    width: ITEM_WIDTH,
    height: '95%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  itemContainer2: {
    paddingHorizontal: 16,
    paddingTop: 15,
    width: ITEM_WIDTH,
    height: '95%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  next: {
    padding: 15,
    borderRadius: 200,
  },
  nextFull: {
    width: '100%',
    paddingVertical: 11,
    borderRadius: 8,
  },
  nextTxt: {
    color: colors.pureWhite,
    textAlign: 'center',
  },
});
