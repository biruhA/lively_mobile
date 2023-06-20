import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Box, Center, CheckIcon, HStack, Image, Select} from 'native-base';
import {GoBack} from '../atoms';
import TouchableIcon from '../atoms/TouchableIcon';
import location from '../../assets/icons/location.png';

export function StoreHeader() {
  const [service, setService] = useState('');

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'}>
      <GoBack label="Stores" />
      {/* <PlaceSelecter service={service} setService={setService} /> */}
      <TouchableIcon
        image={require('../../assets/icons/filter.png')}
        onPress={() => {}}
      />
    </HStack>
  );
}

function PlaceSelecter({service, setService}: any) {
  return (
    <Center>
      <Box maxW="300">
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
          minWidth="200"
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
