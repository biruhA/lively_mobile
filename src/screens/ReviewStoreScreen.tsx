import React, {useState} from 'react';
import {
  Input,
  Heading,
  Stack,
  Text,
  TextArea,
  HStack,
  Image,
  useToast,
} from 'native-base';
import {
  ApiImage,
  GradientButton,
  LabeledHeader,
  Rating,
  UserReviewCard,
} from '../components';
import {Colors, colors} from '../theme/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {fonts} from '../theme/fonts';
import {useRateMutation} from '../store/services';
import {useAppSelector} from '../store/hooks';

export function ReviewStoreScreen() {
  const route = useRoute();
  const toast = useToast();
  const [data, setData] = useState(route?.params?.data);
  const {token} = useAppSelector(state => state.auth);
  const [Rate, result] = useRateMutation();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      review: '',
    },
  });

  console.log(
    '🚀 ~ file: ReviewStoreScreen.tsx:32 ~ ReviewStoreScreen ~ result:',
    result,
    route?.params,
    {
      store_branch_id: route?.params?.data?.data?.id,
      rating: route?.params?.rate,
      review: data?.review,
      token,
    },
  );

  const onSubmit = data => {
    Rate({
      store_branch_id: route?.params?.data?.data?.id,
      rating: route?.params?.rate,
      review: data?.review,
      token,
    })
      .unwrap()
      .then(res => {
        toast.show({
          description:
            'Review Submitted Successfully! Thank you for your feedback!',
        });
      })
      .catch(err => {
        console.log(
          '🚀 ~ file: ReviewStoreScreen.tsx:57 ~ onSubmit ~ err:',
          err?.data?.message,
        );
        toast.show({
          description: 'Something went wrong: ' + err?.data?.message,
        });
      });
  };

  return (
    <Stack flex={1} bg={Colors.background.everlasting_ice}>
      <LabeledHeader label={'Review this store'} />

      <Stack bg={'white'} px={4} py={2} my={4}>
        <Stack
          rounded={'xs'}
          borderColor={colors.grey}
          borderWidth={0.1}
          pt={0.5}
          pb={2}
          px={1}
          overflow={'hidden'}>
          <Stack mb={16}>
            <ApiImage
              imageUrl={data?.data?.cover_image?.url}
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: 200,
                borderRadius: 8,
              }}
            />
            <HStack
              alignItems={'center'}
              space={4}
              position={'absolute'}
              bottom={-65}
              left={4}
              zIndex={2}>
              <ApiImage
                imageUrl={data?.data?.store?.store_logo?.url}
                style={{width: 77, height: 77, borderRadius: 8}}
                resizeMode="contain"
              />
              <Stack>
                <Heading size="md" color={'black'}>
                  {data?.data?.store?.name?.english} {data?.data?.name?.english}
                </Heading>
                <Text>{data?.data?.distance} Away</Text>
              </Stack>
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack bg="white" p={4} space={6}>
        <Rating initalActive={route?.params?.rate} />
        <Controller
          control={control}
          rules={{
            maxLength: {
              value: 250,
              message: 'Review must be less than 250 characters',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Stack alignItems="flex-start" space={2}>
              <Heading>Write a Review</Heading>
              <TextArea
                variant={'filled'}
                w={'100%'}
                size={'lg'}
                placeholder="You can write your review here! (Optional)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                borderRadius={5}
                maxLength={250}
              />
              {errors.review && (
                <Text style={[fonts.caption, {color: 'red'}]}>
                  {errors.review.message}
                </Text>
              )}
              <Text style={[fonts.caption, {color: 'black'}]}>
                {250 - value.length} Word Remaining
              </Text>
            </Stack>
          )}
          name="review"
        />
      </Stack>
      <Stack
        position={'absolute'}
        bottom={0}
        p={4}
        shadow={'5'}
        bg={'white'}
        w={'100%'}>
        <GradientButton
          title="Submit"
          text="Submit Review"
          onPress={handleSubmit(onSubmit)}
          isLoading={false}
        />
      </Stack>
    </Stack>
  );
}
