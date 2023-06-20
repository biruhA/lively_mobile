import React from 'react';
import {Skeleton} from 'native-base';

export function CarouselBrowseSkeleton() {
  return <Skeleton w={'100%'} h={200} rounded={'lg'} p={2} my={3} />;
}
