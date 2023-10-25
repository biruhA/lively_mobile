import {Divider, HStack, Image, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Colors} from '../../theme/colors';
import {Icons} from '../../theme/icons';

export function AccordionItemTwo({title, children}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleExpanded = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Stack px={4} py={3} space={2}>
      <TouchableOpacity onPress={toggleExpanded}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              color: '#636363',
            }}>
            {title}
          </Text>
          {isCollapsed ? <Right /> : <Up />}
        </HStack>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
    </Stack>
  );
}

function Up() {
  return <Image source={Icons.arrow.up} boxSize={5} resizeMode="contain" />;
}

function Right() {
  return <Image source={Icons.arrow.right} boxSize={5} resizeMode="contain" />;
}
