import {Linking, LogBox, View} from 'react-native';
import React, {useState} from 'react';
import share from '../assets/icons/share.png';
// import share from '../assets/icons/share.png';
import {IconOnlyHeader} from '../components/molecules';
import {Button, HStack, Image, ScrollView, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import {useEventDetailQuery} from '../store/services';
import {useSelector} from 'react-redux';
import {LinkingContext} from '@react-navigation/native';

export function EventDetailScreen() {
  const {selectedEventId} = useSelector(state => state.browse);
  const {data, sLoading} = useEventDetailQuery(selectedEventId);
  const [seeMore, setSeeMore] = useState(4);

  return (
    <Stack bg={colors.pureWhite} flex={1} px={4} pt={2} space={4}>
      <IconOnlyHeader
        iconL={share}
        iconR={share}
        onPressL={() => {
          console.log('cat');
        }}
        onPressR={() => {}}
      />
      <ScrollView>
        <Image
          source={{
            uri: data?.data?.cover_image?.url,
          }}
          alt="article"
          w={'100%'}
          h={185}
          borderRadius={10}
          shadow={3}
        />
        <Text style={fonts.heading6} pt={5} pb={2}>
          {data?.data?.title?.english}
        </Text>
        <DetailCard data={data?.data} />
        <Text style={fonts.subtitle1} pt={5} pb={2}>
          About the event
        </Text>
        <Text style={fonts.body1} noOfLines={seeMore} mb={5}>
          {data?.data?.about?.english}
        </Text>
        {seeMore && (
          <Button
            onPress={() => {
              setSeeMore(false);
            }}
            bg={'#E2FFF1'}
            w={100}
            mb={5}
            size={'xs'}
            borderRadius={9}
            alignSelf={'center'}>
            <Text color={colors.primary} fontWeight={'500'}>
              See more
            </Text>
          </Button>
        )}
      </ScrollView>
    </Stack>
  );
}

function DetailCard({data}) {
  return (
    <Stack
      my={2}
      bg={colors.pureWhite}
      borderRadius={12}
      shadow={'2'}
      mx={1}
      px={4}
      py={4}
      space={2}>
      <AddToClaendar data={data} />
      <HostedBy data={data} />
      <Location data={data} />
      <Online data={data} />
    </Stack>
  );
}

function AddToClaendar({data}) {
  return (
    <HStack space={2}>
      <Image
        source={require('../assets/icons/calendar.png')}
        alt="article"
        boxSize={6}
        resizeMode="contain"
      />
      <Stack space={1}>
        <Text style={fonts.normal} pt={1}>
          {new Date(data?.start_date).toDateString().split(' ')[1]}{' '}
          {new Date(data?.start_date).toDateString().split(' ')[2]}
          {' - '}
          {new Date(data?.end_date).toDateString().split(' ')[1]}{' '}
          {new Date(data?.end_date).toDateString().split(' ')[2]}
          {', '}
          {new Date(data?.end_date).toDateString().split(' ')[3]}
        </Text>
        <Text
          style={[fonts.normal, {color: colors.greyText, fontSize: 12}]}
          pt={1}>
          {data?.end_time} {data?.start_time}
        </Text>
        <Button bg={'#E2FFF1'} w={150} size={'xs'} borderRadius={9}>
          <Text color={colors.primary} fontWeight={'500'}>
            Add to calendar
          </Text>
        </Button>
      </Stack>
    </HStack>
  );
}

function HostedBy({data}) {
  return (
    <HStack space={2}>
      <Image
        source={require('../assets/icons/person.png')}
        alt="article"
        boxSize={6}
        resizeMode="contain"
      />
      <Stack space={1}>
        <Text style={fonts.normal} pt={1}>
          Hosted by
        </Text>
        <Text
          style={[fonts.normal, {color: colors.greyText, fontSize: 12}]}
          pt={1}>
          {data?.host?.english}
        </Text>
      </Stack>
    </HStack>
  );
}

function Location({data}) {
  return (
    <HStack space={2}>
      <Image
        source={require('../assets/icons/location.png')}
        alt="article"
        boxSize={6}
        resizeMode="contain"
      />
      <Stack space={1}>
        <Text style={fonts.normal} pt={1}>
          Location
        </Text>
        <Text
          style={[fonts.normal, {color: colors.greyText, fontSize: 12}]}
          pt={1}>
          {data?.location?.english}
        </Text>
        <Button bg={'#E2FFF1'} w={150} size={'xs'} borderRadius={9}>
          <Text color={colors.primary} fontWeight={'500'}>
            View on map
          </Text>
        </Button>
      </Stack>
    </HStack>
  );
}

function Online({data}) {
  return (
    <HStack space={2}>
      <Image
        source={require('../assets/icons/online.png')}
        alt="article"
        boxSize={6}
        resizeMode="contain"
      />
      <Stack space={1}>
        <Text style={fonts.normal} pt={1}>
          Online
        </Text>

        <Button
          bg={'#E2FFF1'}
          w={150}
          size={'xs'}
          borderRadius={9}
          onPress={() => {
            Linking.openURL(data?.link).catch(err =>
              console.error('An error occurred', err),
            );
          }}>
          <Text color={colors.primary} fontWeight={'500'}>
            Go to event
          </Text>
        </Button>
      </Stack>
    </HStack>
  );
}
