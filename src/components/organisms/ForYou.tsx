import {FlatList} from 'react-native';
import React from 'react';
import {Spinner, Stack} from 'native-base';
import {ForYouCard, SectionHeader} from '../molecules';
import {ScreenNames} from '../../constants';
import {useCollectionsQuery} from '../../store/services';

interface Props {
  id: string;
  name: string;
  list: string;
}

export function ForYou() {
  const {data, isLoading} = useCollectionsQuery();
  return (
    <Stack bg={'white'} p={4} space={2}>
      <SectionHeader
        label="Collections Just For You"
        navTo={ScreenNames.SeeAllCollection}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          horizontal={true}
          data={data?.data}
          renderItem={({item}) => (
            <ForYouCard
              id={item.id}
              name={item.title?.english}
              imageUrl={item?.collection_image?.url}
              list={item.description?.english}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </Stack>
  );
}
