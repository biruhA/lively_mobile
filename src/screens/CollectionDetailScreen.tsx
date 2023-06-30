import {FlatList, ScrollView, View} from 'react-native';
import React from 'react';
import {Stack, Text, Image, VStack} from 'native-base';
import {colors} from '../theme/colors';
import {IconOnlyHeader} from '../components/molecules';
import {fonts} from '../theme/fonts';
import {useRoute} from '@react-navigation/native';
import {useCollectionDetailQuery} from '../store/services';

export function CollectionDetailScreen() {
  const route = useRoute();
  const {data, isLoading} = useCollectionDetailQuery(route?.params?.id);
  console.log(
    '🚀 ~ file: CollectionDetailScreen.tsx:16 ~ CollectionDetailScreen ~ data:',
    data?.data,
  );

  return (
    <Stack flex={1} px={4} py={2} space={2} bg={colors.pureWhite}>
      <IconOnlyHeader
        iconL={require('../assets/icons/heart-bold.png')}
        iconR={require('../assets/icons/share.png')}
        onPressL={() => {
          console.log('cat');
        }}
        onPressR={() => {}}
      />
      <ScrollView>
        <Stack flex={1} space={2} bg={'#f6fbfb'}>
          <Image
            source={{
              uri: data?.data?.collection_image?.url,
            }}
            alt="Alternate Text"
            rounded={'md'}
            w={'100%'}
            h={200}
            my={4}
            resizeMode={'cover'}
            borderWidth={1}
            borderColor={colors.pureWhite}
          />
          <Text style={fonts.heading5}>{data?.data?.title?.english}</Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#00BA63',
              fontSize: 18,
              marginBottom: 16,
            }}>
            {data?.data?.price} Birr
          </Text>
          <Text style={fonts.subtitle1}>Product Description</Text>
          <Text style={fonts.body1}>{data?.data?.description?.english}</Text>
          <Stack
            borderStyle={'dashed'}
            borderWidth={1}
            borderColor={'#c3c3c3'}
            p={4}
            borderRadius={'md'}>
            <Text style={fonts.subtitle1}>Inside the collection</Text>
            <FlatList
              data={data?.data?.products}
              renderItem={({item}) => (
                <Stack
                  my={2}
                  p={3}
                  alignItems={'center'}
                  rounded={'md'}
                  bg={colors.pureWhite}
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
      </ScrollView>
    </Stack>
  );
}
