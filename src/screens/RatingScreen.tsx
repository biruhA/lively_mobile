import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Center,
  FlatList,
  HStack,
  Heading,
  Image,
  Progress,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {GradientButton, LabeledHeader, UserReviewCard} from '../components';
import {Colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import {Icons} from '../theme/icons';
import {ScreenNames} from '../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useRatingDetailQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';

export function RatingScreen() {
  const route = useRoute();
  const {token} = useAppSelector(state => state.auth);
  const navigation = useNavigation();
  const {data, isLoading} = useRatingDetailQuery({
    id: route?.params?.data?.data?.id,
    token,
  });

  return (
    <Stack flex={1} space={2} bg={Colors.background.everlasting_ice}>
      <LabeledHeader label={'Rating'} />
      <OverallRating data={data?.data} />
      <Stack bg={'white'} py={4} px={2} space={2}>
        {isLoading ? (
          <Center py={24}>
            <Spinner />
          </Center>
        ) : (
          <FlatList
            data={data?.data?.review?.data}
            renderItem={({item}) => <UserReviewCard data={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </Stack>
      <GradientButton
        disabled={false}
        text="Write a Review"
        mainStyle={styles.mainStyle}
        onPress={() => {
          navigation.navigate(ScreenNames.ReviewStore, {
            rate: '0',
            data: route?.params?.data,
          });
        }}
      />
    </Stack>
  );
}

function OverallRating({data}) {
  console.log('🚀 ~ file: RatingScreen.tsx:67 ~ OverallRating ~ data:', data);
  return (
    <Stack bg={'white'} py={3} px={6} space={4}>
      <Text style={fonts.body1}>Overall Rating</Text>
      <HStack space={4}>
        <Heading size={'2xl'} style={fonts.heading2}>
          {data?.average}
        </Heading>
        <Stack space={2}>
          <Image
            source={Icons.smileFace.yellow}
            boxSize={4}
            resizeMode={'contain'}
          />
          <Text style={fonts.button2}>Based on {data?.users_count} users</Text>
        </Stack>
      </HStack>
      <Stack space={2} mt={1}>
        <ProgressBar label="Excellent" bg="#008579" value={90} />
        <ProgressBar label="Good" bg="#00BA63" value={75} />
        <ProgressBar label="Average" bg="#D8C200" value={50} />
        <ProgressBar label="Below Average" bg="#DC7700" value={35} />
        <ProgressBar label="Excellent" bg="#CD1616" value={15} />
      </Stack>
    </Stack>
  );
}

function ProgressBar({label, value, bg}) {
  return (
    <HStack alignItems={'center'} justifyContent={'space-between'}>
      <Text style={[fonts.button2, {fontSize: 16}]}>{label}</Text>
      <Progress
        w={'65%'}
        size="sm"
        value={value}
        _filledTrack={{
          bg: bg,
        }}
      />
    </HStack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 8,
  },
});
