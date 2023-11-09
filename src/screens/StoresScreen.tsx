import {Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Center, HStack, Image, Spinner, Stack} from 'native-base';
import {fonts} from '../theme/fonts';
import {StoresCardLarge} from '../components/molecules';
import {Colors, colors} from '../theme/colors';
import {useStoresQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {ApiImage, LabeledHeader} from '../components';
import EnableLocation from '../components/atoms/EnableLocation';

interface Props {
  id?: string;
  label: string;
  value: string;
}

export function StoresScreen() {
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedProduct, selectedProductVariantIndex} = useAppSelector(
    state => state.product,
  );
  const [page, setPage] = useState(1);
  const {data, isLoading} = useStoresQuery({
    id: selectedProduct?.variants[selectedProductVariantIndex]?.id,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
    page: page,
  });

  return (
    <Stack bg={Colors.background.everlasting_ice} flex={1}>
      <LabeledHeader label="Stores" />
      <Stack px={4} py={2} space={2}>
        <SelectedProductCard />
        <Text style={fonts.subtitle1}>All Available Stores</Text>
        <EnableLocation />
        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            data={data?.data?.data}
            ListFooterComponent={() => {
              return (
                <Center flex={1} py={1}>
                  {data?.data?.next_page_url || isLoading ? (
                    <Spinner />
                  ) : (
                    <Text>- End -</Text>
                  )}
                </Center>
              );
            }}
            onEndReachedThreshold={1}
            onEndReached={() => {
              if (data?.data?.next_page_url) {
                setPage(prev => prev + 1);
              }
            }}
            renderItem={({item}) => (
              <StoresCardLarge
                id={item?.id}
                store={item?.store_name?.english}
                distance={item?.distance}
                rating={item?.rating?.average}
                imageUrl={item?.store_logo?.url}
                price={item?.price}
                discountAmount={null}
                discountPresent={null}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </Stack>
    </Stack>
  );
}

function SelectedProductCard() {
  const {selectedProduct, selectedProductVariantIndex} = useAppSelector(
    state => state.product,
  );
  return (
    <HStack space={3} pb={2}>
      <ApiImage
        imageUrl={selectedProduct?.thumbnail?.url}
        style={{width: 94, height: 54}}
      />
      <Stack w={'70%'} space={1}>
        <Text style={fonts.subtitle1}>{selectedProduct?.title?.english}</Text>
        <Text style={[fonts.body2, {color: colors.primary}]}>
          Selected Size:{' '}
          {
            selectedProduct?.variants[selectedProductVariantIndex]?.value
              ?.english
          }
        </Text>
      </Stack>
    </HStack>
  );
}
