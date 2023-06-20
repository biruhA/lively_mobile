import {FlatList, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {Image, Text, Stack} from 'native-base';
import {colors} from '../theme/colors';
import {ListEmptyComponent} from '../components/atoms';
import {ProductCard} from '../components/molecules';
import {ScreenNames} from '../constants';

const Data = [
  {
    id: '1',
    label: 'Pharmacies',
    icon: null,
  },
  {
    id: '2',
    label: 'Sores',
    icon: null,
  },
  {
    id: '3',
    label: 'Clinics',
    icon: null,
  },
  {
    id: '4',
    label: 'MakeUp',
    icon: null,
  },
];

export function DiscountScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack flex={1} bg={colors.pureWhite}>
        {/* <StatusBar hidden /> */}
        <Image
          source={{
            uri: 'https://images.ctfassets.net/3shtzlb7cz90/3a4AGnC7Txy9LEuyMk2i9i/dc2f8e406bb7a670a375068bbff37541/PROJ024724-P_G-Pampers-Hero-Banner-3-1600x880-v0.01.jpg?fm=webp&q=70&w=800&h=440',
          }}
          alt="headings"
          w={'100%'}
          h={175}
          resizeMode="cover"
        />
        <FlatList
          style={{marginTop: 4}}
          numColumns={2}
          data={Data}
          ListEmptyComponent={() => {
            return <ListEmptyComponent />;
          }}
          renderItem={({item}) => (
            <ProductCard
              navTo={ScreenNames.DiscountDetail}
              imageUrl={
                'https://images.ctfassets.net/3shtzlb7cz90/3a4AGnC7Txy9LEuyMk2i9i/dc2f8e406bb7a670a375068bbff37541/PROJ024724-P_G-Pampers-Hero-Banner-3-1600x880-v0.01.jpg?fm=webp&q=70&w=800&h=440'
              }
              item={item?.label}
              volume={item?.label}
              amount={item?.label}
              mainStyle={{width: '47%', marginBottom: 12}}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      </Stack>
    </SafeAreaView>
  );
}
