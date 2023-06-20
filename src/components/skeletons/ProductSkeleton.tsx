import React from 'react';
import {HStack, Skeleton} from 'native-base';

export function ProductSkeleton() {
  return (
    <HStack>
      {[1, 2, 3, 4, 5].map(item => (
        <Skeleton w={150} key={item} h={175} rounded={'md'} p={2} />
      ))}
    </HStack>
  );
}
