import {FlatList, ScrollView, View} from 'react-native';
import React from 'react';
import {Stack, Text, Image, VStack} from 'native-base';
import {colors} from '../theme/colors';
import {IconOnlyHeader} from '../components/molecules';
import {fonts} from '../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {useCollectionDetailQuery} from '../store/services';
import {StyleSheet} from 'react-native';
import {GradientButton} from '../components/atoms';

export function CollectionDetailScreen() {
  const route = useRoute();
  const {data, isLoading} = useCollectionDetailQuery(route?.params?.id);
  console.log(
    '🚀 ~ file: CollectionDetailScreen.tsx:16 ~ CollectionDetailScreen ~ data:',
    data?.data,
  );

  return (
    <Stack flex={1} bg={colors.pureWhite}>
      <Stack p={4} bg={'white'}>
        <IconOnlyHeader
          iconL={require('../assets/icons/heart-bold.png')}
          iconR={require('../assets/icons/share.png')}
          onPressL={() => {
            console.log('cat');
          }}
          onPressR={() => {}}
        />
      </Stack>
      <ScrollView>
        <Stack flex={1} space={4} p={4}>
          <Stack>
            <Image
              source={{
                uri: data?.data?.collection_image?.url,
              }}
              alt="Alternate Text"
              rounded={'lg'}
              w={'100%'}
              h={200}
              resizeMode={'cover'}
              borderWidth={2}
              borderColor={'white'}
              style={styles.main}
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
                    <Image
                      source={{
                        uri: item?.product?.product_image?.url,
                      }}
                      alt="Alternate Text"
                      boxSize={184}
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
        <GradientButton text="Buy Now" onPress={() => {}} />
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
  },
});
