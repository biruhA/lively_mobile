import React from 'react';
import {Center, FlatList, Spinner, Stack, Text} from 'native-base';
import {AccordionItem, LabeledHeader} from '../components';
import {Colors} from '../theme/colors';
import {useGetFaqsQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {fonts} from '../theme/fonts';

export function FaqScreen() {
  const {data, isLoading} = useGetFaqsQuery();

  console.log(
    '🚀 ~ file: FaqScreen.tsx:10 ~ FaqScreen ~ data:',
    data?.data?.data,
  );

  return (
    <Stack bg={Colors.background.artemisia} flex={1}>
      <LabeledHeader label="FAQ" />
      <Stack bg={'white'} mx={4} my={6} p={4} rounded={'lg'}>
        {isLoading ? (
          <Center flex={1}>
            <Spinner />
          </Center>
        ) : (
          <FlatList
            data={data?.data?.data}
            renderItem={({item}) => (
              <AccordionItem title={item?.question?.english}>
                <Text style={fonts.caption}>{item?.answer.english}</Text>
              </AccordionItem>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </Stack>
    </Stack>
  );
}
