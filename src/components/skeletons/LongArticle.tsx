import React from 'react';
import {HStack, Skeleton, Stack} from 'native-base';

export function LongArticle() {
  return (
    <Stack rounded={'lg'}>
      {[1, 2, 3, 4, 5].map(item => (
        <Skeleton w={'100%'} key={item} h={100} rounded={'lg'} p={2} />
      ))}
    </Stack>
  );
}
