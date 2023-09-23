import {Divider, HStack, Image, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Colors} from '../../theme/colors';
import {Icons} from '../../theme/icons';

export function AccordionItem({title, children}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Stack py={2} space={2}>
      <TouchableOpacity onPress={toggleExpanded}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text fontSize={'lg'} color={Colors.Text.green_elliott}>
            {title}
          </Text>
          <Image source={Icons.downArrow} boxSize={3} resizeMode="contain" />
        </HStack>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
      <Divider thickness={'0.5'} />
    </Stack>
  );
}
