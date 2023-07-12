import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {
  Spacer,
  Divider,
  HStack,
  Stack,
  Text,
  VStack,
  Heading,
  Box,
  FlatList,
  useToast,
} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack, GradientButton} from '../components/atoms';
import {fonts} from '../theme/fonts';
import FastImage from 'react-native-fast-image';

export function CheckoutScreen() {
  const toast = useToast();
  const data = [
    {
      id: '1',
      item_detail:
        'Royal Moroccan Nourishing Mask Treatment for Thin & Fine Hair',
      price: '200',
    },
    {
      id: '2',
      item_detail:
        'Royal Moroccan Nourishing Mask Treatment for Thin & Fine Hair',
      price: '200',
    },
  ];

  function onOrderNowPress() {
    toast.show({
      description: 'Order made successfully',
      placement: 'top',
    });
  }
  return (
    <Stack
      px={'16px'}
      bg={colors.pureWhite}
      h={'full'}
      pb={2}
      _light={{
        backgroundColor: '#ffffffff',
      }}>
      <HStack alignItems={'center'} justifyContent={'space-between'} py={4}>
        <GoBack label="Checkout" />
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack borderRadius={40} backgroundColor={colors.pureWhite}>
          <FastImage
            style={styles.bannerStyle}
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
            resizeMode={'cover'}
          />
          <Box position={'absolute'} w={'100%'} bottom={0}>
            <VStack w={'100%'} px={2}>
              <Text
                color={colors.pureWhite}
                fontWeight={'semibold'}
                fontSize={28}
                numberOfLines={1}>
                Konjo Collection
              </Text>
              <Text
                fontSize={16}
                color={colors.pureWhite}
                numberOfLines={1}
                paddingBottom={2}>
                5 Items
              </Text>
            </VStack>
          </Box>
        </Stack>

        <Stack py={4} />
        <Box>
          <Heading fontSize="xl" pb="1">
            Order summary
          </Heading>
          <Divider bg={'#E6E6E6'} thickness="0.5" />

          <FlatList
            data={data}
            renderItem={({item}) => (
              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack>
                  <Text w={'80%'} style={fonts.subtitle2}>
                    {item.item_detail}
                  </Text>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item.price} Birr
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        </Box>

        <Divider marginTop={1} bg={'#E6E6E6'} thickness="0.5" />
        <VStack>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            paddingTop={2}
            maxW="350">
            <HStack w={'66%'}>
              <Text style={fonts.subtitle2}>Sub-total</Text>
            </HStack>
            <HStack>
              <Text fontSize="md" alignSelf="flex-end">
                400 Birr
              </Text>
            </HStack>
          </HStack>

          <Divider marginTop={1} bg={'#E6E6E6'} thickness="0.5" />

          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            paddingTop={2}
            maxW="350">
            <HStack w={'66%'}>
              <Text style={fonts.subtitle2}>Vat (15 %)</Text>
            </HStack>
            <HStack>
              <Text fontSize="md" alignSelf="flex-end">
                60 Birr
              </Text>
            </HStack>
          </HStack>

          <Divider marginTop={1} bg={'#E6E6E6'} thickness="0.5" />

          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            paddingTop={2}
            maxW="350">
            <HStack w={'66%'}>
              <Text style={fonts.subtitle2}>Delivery Fee</Text>
            </HStack>
            <HStack>
              <Text fontSize="md" alignSelf="flex-end">
                45 Birr
              </Text>
            </HStack>
          </HStack>
          <Divider marginTop={1} bg={'#E6E6E6'} thickness="0.5" />
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            paddingTop={2}
            maxW="350">
            <HStack w={'66%'}>
              <Text style={fonts.subtitle1}>Total </Text>
            </HStack>
            <HStack>
              <Text fontSize="md" alignSelf="flex-end">
                45 Birr
              </Text>
            </HStack>
          </HStack>
        </VStack>
        <Stack py={6} />
      </ScrollView>
      <GradientButton
        title="Order Now"
        text="Order Now"
        onPress={onOrderNowPress}
        // disabled={!isValid}
        // isLoading={result?.isLoading}
        mainStyle={styles.mainStyle}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {marginTop: 15},
  bannerStyle: {
    width: '100%',
    height: 103,
    borderRadius: 10,
  },
});
