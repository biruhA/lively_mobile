import {FlatList} from 'react-native';
import React from 'react';
import {Center, ScrollView, Spinner, Stack} from 'native-base';
import {DealsCard, SectionHeader} from '../molecules';
import {useDealsQuery} from '../../store/services';
import {ListEmptyComponent} from '../atoms';

interface Props {
  label?: string;
  navTo: string;
}

interface dataProps {
  id: string;
  item: string;
  volume: string;
  price: string;
  discount: string;
}

export function Deals({label = 'Deals', navTo = 'Articles'}: Props) {
  const {data, isLoading} = useDealsQuery();
  console.log('🚀 ~ file: Deals.tsx:81 ~ Deals ~ data:', data?.data);
  return (
    <Stack>
      <SectionHeader label={label} navTo={navTo} />
      {isLoading ? (
        <Center py={25}>
          <Spinner />
        </Center>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}>
          <FlatList
            contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns={Math.ceil(data?.data.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <ListEmptyComponent message="No deals yet" />
            )}
            data={data?.data}
            renderItem={({item}) => (
              <DealsCard
                item={item?.product_name?.english}
                volume={item.volume}
                price={item.current_price}
                discount={item.discount}
              />
            )}
            keyExtractor={(item: dataProps) => item.id}
          />
        </ScrollView>
      )}
    </Stack>
  );
}
