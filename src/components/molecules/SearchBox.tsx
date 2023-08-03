import {StyleSheet, TouchableOpacity} from 'react-native';
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
  hasCamera?: boolean;
}

export function SearchBox({mainStyle, onCamPress, hasCamera}: Props) {
  const navigation = useNavigation();
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
          <Text style={[fonts.body1, styles.ellipsis]} noOfLines={1}>
            Search for a products, articles, Pharmacies
          </Text>
          {hasCamera && (
            <TouchableOpacity onPress={onCamPress}>
              <Image
                source={cameraSearch}
                alt="camera search"
                size="24px"
                ml={1}
              />
            </TouchableOpacity>
          )}
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}

const styles = StyleSheet.create({
  ellipsis: {
    width: '70%',
    color: '#0000003B',
    fontSize: 14,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});
