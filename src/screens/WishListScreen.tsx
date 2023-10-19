import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {HStack, Spinner, Stack} from 'native-base';
import {colors} from '../theme/colors';
import {
  GradientButtonSmall,
  LabeledHeader,
  ListEmptyComponent,
  ProductCard,
  StoresCardLarge,
} from '../components';
import {ProductSkeletonColumn} from '../components/skeletons';
import {useMyStoreWishlistsQuery, useMyWishlistsQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';

const Data = [
  {
    id: '1',
    name: 'Products',
  },
  {
    id: '2',
    name: 'Stores',
  },
];

export function WishListScreen() {
  const [activeId, setActiveId] = useState('1');
  const {token} = useAppSelector(state => state.auth);
  const ProductWishlists = useMyWishlistsQuery(token);
  const StoreWishlists = useMyStoreWishlistsQuery(token);

  console.log('🚀 ~ file: WishListScreen.tsx:10 ~ WishListScreen:', {
    activeId: activeId,
    ProductWishlists: ProductWishlists?.data?.data?.products,
    StoreWishlists: StoreWishlists?.data?.data?.stores,
  });

  return (
    <Stack bg={colors.pureWhite} flex={1} space={2}>
      <LabeledHeader label="Saved" style={{backgroundColor: 'white'}} />
      <Stack bg={'white'} flex={1} space={4} py={2}>
        <CatalogList activeId={activeId} setActiveId={setActiveId} />
        {activeId == '1' ? (
          <ProductsList
            data={ProductWishlists?.data?.data?.products}
            isLoading={ProductWishlists?.isLoading}
          />
        ) : (
          <StoreList
            data={StoreWishlists?.data?.data?.store}
            isLoading={StoreWishlists?.isLoading}
          />
        )}
      </Stack>
    </Stack>
  );
}

function CatalogList({activeId, setActiveId}) {
  return (
    <HStack pl={4} pr={1}>
      <FlatList
        data={Data}
        horizontal={true}
        renderItem={({item}) => (
          <GradientButtonSmall
            variant={{}}
            text={item?.name}
            onPress={() => setActiveId(item?.id)}
            isActive={activeId === item?.id}
          />
        )}
        keyExtractor={item => item.id}
      />
    </HStack>
  );
}

function ProductsList({data, isLoading}) {
  return (
    <>
      {isLoading ? (
        <ProductSkeletonColumn />
      ) : (
        <FlatList
          numColumns={2}
          data={data}
          ListEmptyComponent={() => <ListEmptyComponent />}
          renderItem={({item}) => (
            <ProductCard
              id={item?.id}
              imageUrl={item?.thumbnail?.url}
              isWishlist={item?.is_wishlist}
              item={item.title?.english}
              volume={item.variant_count}
              amount={item.from}
              mainStyle={{width: '50%', marginBottom: 12}}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </>
  );
}

function StoreList({data, isLoading}) {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={data}
          ListEmptyComponent={() => <ListEmptyComponent message="No Stores" />}
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
    </>
  );
}
