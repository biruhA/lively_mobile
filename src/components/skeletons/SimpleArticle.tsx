import React from 'react';
import {HStack, Skeleton, Stack} from 'native-base';

export function SimpleArticle() {
  return (
    <HStack rounded={'lg'}>
      {[1, 2, 3, 4, 5].map(item => (
        <Skeleton w={100} h={9} rounded={'md'} my={2} />
      ))}
    </HStack>
  );
}
