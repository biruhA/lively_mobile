import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Text,
  Avatar,
  Divider,
  HStack,
  Heading,
  Image,
  Stack,
} from 'native-base';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import {Icons} from '../../theme/icons';
import {setSelectedRate} from '../../store/features/productSlice';
import {ApiImage} from '..';

export function UserReviewCard({hasReadMoreButton = true, data}) {
  const [readMore, setReadMore] = useState(true);
  console.log(
    '🚀 ~ file: UserReviewCard.tsx:20 ~ UserReviewCard ~ readMore:',
    readMore,
  );

  return (
    <HStack
      p={3}
      bg="white"
      rounded={'xs'}
      borderColor={colors.grey}
      borderWidth={0.1}
      space={3}>
      <ApiImage
        imageUrl={data?.user?.profile_image}
        style={{width: 65, height: 65, borderRadius: 200}}
        resizeMode="cover"
      />
      <Stack space={1} w={'75%'}>
        <HStack space={2} alignItems={'center'}>
          <Heading size={'md'}>{data?.user?.name}</Heading>
          <Divider orientation="vertical" h={4} />
          <Text fontSize={'md'}>{data?.rating}</Text>
          <Image
            source={Icons.smileFace.yellow}
            boxSize={4}
            resizeMode={'contain'}
          />
        </HStack>
        <Text color={'#B4B4B4'} style={fonts.button2}>
          {new Date(data?.created_at).toDateString()}
        </Text>
        <Text numberOfLines={readMore ? 2 : 0} style={fonts.body1}>
          {data?.review}
        </Text>
        {hasReadMoreButton && readMore && (
          <TouchableOpacity
            onPress={() => {
              setReadMore(false);
            }}>
            <Text style={fonts.body1}>read more</Text>
          </TouchableOpacity>
        )}
      </Stack>
    </HStack>
  );
}
