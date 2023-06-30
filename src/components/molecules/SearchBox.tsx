import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, HStack, Image, Stack} from 'native-base';
import {colors} from '../../theme/colors';
import search from '../../assets/icons/search.png';
import cameraSearch from '../../assets/icons/camera-search.png';
import {fonts} from '../../theme/fonts';
import {ScreenNames} from '../../constants';

interface Props {
  mainStyle?: object;
  onCamPress: any;
}

export function SearchBox({mainStyle, onCamPress}: Props) {
  const navigation = useNavigation();
  // px={4} py={3}
  return (
    <Stack bg={'white'} style={[mainStyle]}>
      <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.Search)}>
        <HStack
          alignItems={'center'}
          space={2}
          bg={colors.unselected}
          py={3}
          rounded={40}>
          <Image source={search} alt="search" size="24px" ml={4} />
          <Text style={[fonts.body1, {fontSize: 14, color: '#0000003B'}]}>
            Search for a products, articles, Pharmacies
          </Text>
          <TouchableOpacity onPress={onCamPress}>
            <Image
              source={cameraSearch}
              alt="camera search"
              size="24px"
              ml={1}
            />
          </TouchableOpacity>
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}
