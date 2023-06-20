import React from 'react';
import {HStack, Skeleton, VStack} from 'native-base';

export function CatalogueSkeleton() {
  return (
    <HStack space={6}>
      {[1, 2, 3, 4, 5].map(item => (
        <VStack space={2} key={item}>
          <Skeleton size="100" rounded="full" />
          <Skeleton.Text px="5" lines={1} />
        </VStack>
      ))}
    </HStack>
  );
}
