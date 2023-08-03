import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {Text, Avatar, HStack, Stack, Box, Center, Spinner} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack, ListEmptyComponent} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {useNotificationsQuery} from '../store/services';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {fonts} from '../theme/fonts';
import {setSelectedNotificationId} from '../store/features/medicineSlice';

export function NotificationScreen() {
  const {token} = useAppSelector(state => state.auth);
  const {data, isLoading} = useNotificationsQuery(token);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack flex={1} bg={colors.pureWhite}>
      <Stack bg={'white'} p={4}>
        <GoBack label="Notifications" />
      </Stack>
      <Stack px={4} space={4} py={4}>
        <HStack>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '700',
              color: colors.primary,
            }}>
            {data?.data?.length} new
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '700',
              color: colors.greyText,
            }}>
            Notification
          </Text>
        </HStack>
        <FlatList
          data={data?.data}
          ListEmptyComponent={<ListEmptyComponent />}
          renderItem={({item}) => (
            <NotificationCard
              id={item?.data?.id}
              title={item?.data?.title}
              message={item?.data?.message}
              time={item?.createdAt}
              medicineImages={item?.data?.medicine_images}
            />
          )}
          keyExtractor={item => item.id}
        />
      </Stack>
    </Stack>
  );
}

const NotificationCard = ({id, title, message, time, medicineImages}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  let dateValue = new Date(time).toDateString().split(' ');
  let timeValue = new Date(time).toLocaleTimeString().split(':');

  return (
    <Stack
      bg={'white'}
      px={2}
      py={2}
      shadow={0}
      rounded={'lg'}
      space={3}
      mb={3}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setSelectedNotificationId(id));
          if (title === 'Discount Claimed!') {
            navigation.navigate(ScreenNames.NotificationDiscount);
          } else if (title === 'Your prescription has been verified!') {
            navigation.navigate(ScreenNames.MedicinePerscription);
          }
        }}>
        <HStack alignItems={'center'} justifyContent={'space-between'} pb={2}>
          <Stack>
            {medicineImages && <AvatarGroup medicineImages={medicineImages} />}
          </Stack>
          <HStack space={1}>
            <Text style={fonts.caption}>
              {timeValue[0]}:{timeValue[1]}
            </Text>
            <Text style={[fonts.caption, styles.ellipse]}>.</Text>
            <Text style={fonts.caption}>
              {dateValue[1]} {dateValue[2]}/{dateValue[3]}
            </Text>
          </HStack>
        </HStack>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            fontWeight: '700',
            color: colors.primary,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            fontWeight: '400',
            color: colors.pureBlack,
            backgroundColor: '#ebf6f1',
            padding: 8,
            borderRadius: 5,
          }}>
          {message}
        </Text>
      </TouchableOpacity>
    </Stack>
  );
};

function AvatarGroup({medicineImages}) {
  return (
    <Stack alignItems="flex-start" px={4}>
      <Avatar.Group
        _avatar={{
          size: 'sm',
        }}
        max={4}>
        {medicineImages?.map(item => {
          return (
            <Avatar
              bg="green.500"
              source={{
                uri: item?.url,
              }}>
              AJ
            </Avatar>
          );
        })}
      </Avatar.Group>
    </Stack>
  );
}

const styles = StyleSheet.create({
  ellipse: {
    width: 3,
    height: 3,
    backgroundColor: '#909090',
    borderRadius: 200,
    alignSelf: 'center',
  },
});
