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

export function UserReviewCard({hasReadMoreButton = true, data}) {
  const [readMore, setReadMore] = useState(true);

  console.log(
    '🚀 ~ file: UserReviewCard.tsx:17 ~ UserReviewCard ~ data:',
    data,
  );

  return (
    <HStack
      p={3}
      bg="white"
      rounded={'xs'}
      borderColor={colors.grey}
      borderWidth={0.1}
      space={3}>
      <Avatar
        size={'lg'}
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg',
        }}
      />
      <Stack space={1} w={'75%'}>
        <HStack space={2} alignItems={'center'}>
          <Heading size={'md'}>Lema Kebede</Heading>
          <Divider orientation="vertical" h={4} />
          <Text fontSize={'md'}>4</Text>
          <Image
            source={Icons.smileFace.yellow}
            boxSize={4}
            resizeMode={'contain'}
          />
        </HStack>
        <Text color={'#B4B4B4'} style={fonts.button2}>
          Jul 24/2023
        </Text>
        <Text numberOfLines={readMore ? 2 : 0} style={fonts.body1}>
          The researchers performed eye exams just before & five minutes,The
          researchers performed eye exams just before & five minutes ,The
          researchers performed eye exams just before & five minutes
        </Text>
        {hasReadMoreButton && (
          <TouchableOpacity
            onPress={() => {
              setReadMore(pre => !pre);
            }}>
            <Text style={fonts.body1}>read more</Text>
          </TouchableOpacity>
        )}
      </Stack>
    </HStack>
  );
}
