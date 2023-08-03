import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Stack,
  Text,
  Image,
  VStack,
  useToast,
  Spinner,
  Center,
} from 'native-base';
import {colors} from '../theme/colors';
import {IconOnlyHeader} from '../components/molecules';
import {fonts} from '../theme/fonts';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCollectionDetailQuery} from '../store/services';
import {GoBack, GradientButton} from '../components/atoms';
import {ScreenNames} from '../constants';
import {useAppSelector} from '../store/hooks';
import FastImage from 'react-native-fast-image';

export function CollectionDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userLocation} = useAppSelector(state => state.search);
  const {data, isLoading} = useCollectionDetailQuery({
    id: route?.params?.id,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
  });
  const toast = useToast();

  console.log(
    '🚀 ~ file: CollectionDetailScreen.tsx:24 ~ CollectionDetailScreen ~ data:',
    data,
  );

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  function onBuyPress() {
    // navigation.navigate(ScreenNames.CheckoutScreen);
    toast.show({
      description: 'Coming Soon: Buy Collections on the Lively! Stay tuned!',
    });
  }

  return (
    <Stack flex={1} bg={colors.pureWhite}>
      <Stack p={4} bg={'white'}>
        <GoBack label="" />
      </Stack>
      <ScrollView>
        <Stack flex={1} space={4} p={4}>
          <Stack>
            <FastImage
              style={{width: '100%', height: 200, ...styles.main}}
              source={{
                uri: data?.data?.collection_image?.url,
              }}
              resizeMode={'cover'}
            />
          </Stack>
          <Stack bg={'white'} space={2} borderRadius={'lg'} px={2} py={4}>
            <Text style={fonts.heading5}>{data?.data?.title?.english}</Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#00BA63',
                fontSize: 18,
                marginBottom: 8,
              }}>
              {data?.data?.price} Birr
            </Text>
            <Text style={fonts.subtitle1}>Product Description</Text>
            <Text style={fonts.body1}>{data?.data?.description?.english}</Text>
            <Text style={fonts.subtitle1}>Inside the collection</Text>
            <Stack
              borderWidth={1}
              borderColor={'#F5F5F5'}
              p={4}
              borderRadius={'lg'}>
              <FlatList
                data={data?.data?.products}
                renderItem={({item}) => (
                  <Stack
                    my={2}
                    p={3}
                    alignItems={'center'}
                    rounded={'md'}
                    bg={'white'}
                    space={2}>
                    <FastImage
                      style={{width: 184, height: 184}}
                      source={{
                        uri: item?.product?.product_image?.url,
                      }}
                      resizeMode={'cover'}
                    />
                    <Text style={fonts.body1}>
                      {item?.product?.product?.title?.english}
                    </Text>
                  </Stack>
                )}
                keyExtractor={(item: Props) => item.id}
              />
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
      <Stack p={2} bg={'white'}>
        <GradientButton text="Buy Now" onPress={onBuyPress} />
      </Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  main: {
    shadowColor: 'rgba(25, 38, 32, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
    borderRadius: 8,
  },
});
