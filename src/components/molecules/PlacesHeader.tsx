import {Text} from 'react-native';
import React, {useState} from 'react';
import {
  Avatar,
  Box,
  Center,
  CheckIcon,
  HStack,
  Image,
  Select,
} from 'native-base';
import {fonts} from '../../theme/fonts';
import bell from '../../assets/icons/bell.png';
import cart from '../../assets/icons/cart.png';
import location from '../../assets/icons/location.png';
import searchBlack from '../../assets/icons/search-black.png';

export function PlacesHeader() {
  const [service, setService] = useState('');

  return (
    <HStack alignItems={'center'} justifyContent={'space-between'} py={4}>
      <HStack alignItems={'center'} space={2}>
        <Avatar
          size={'32px'}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          AJ
        </Avatar>
        <Text style={fonts.subtitle1}>Places</Text>
      </HStack>
      <PlaceSelecter service={service} setService={setService} />
      <HStack alignItems={'center'} space={5}>
        <Image source={searchBlack} alt="searchBlack" size="20px" />
        <Image source={cart} alt="Alternate Text" size="24px" />
      </HStack>
    </HStack>
  );
}

function PlaceSelecter({service, setService}: any) {
  return (
    <Center>
      <Box maxW="160">
        <Image
          source={location}
          alt="location"
          boxSize={7}
          position={'absolute'}
          top={3}
          ml={2.5}
          zIndex={1}
        />
        <Select
          pl={12}
          rounded={20}
          variant="filled"
          selectedValue={service}
          minWidth="100%"
          height="41"
          accessibilityLabel="Choose Store"
          placeholder="Choose Store"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="Edna Mall" value="Edna Mall" />
          <Select.Item label="Edna Mall" value="Edna Mall" />
          <Select.Item label="Edna Mall" value="Edna Mall" />
          <Select.Item label="Edna Mall" value="Edna Mall" />
        </Select>
      </Box>
    </Center>
  );
}
