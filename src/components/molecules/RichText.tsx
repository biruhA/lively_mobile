import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {RichEditor} from 'react-native-pell-rich-editor';

interface Props {
  text: string;
}

export const RichText = ({text}: Props) => {
  const richText = useRef();
  const [textData, setTextData] = useState(text);

  useEffect(() => {
    setTextData(text);
  }, [text]);

  return (
    <ScrollView>
      <RichEditor
        ref={richText}
        androidHardwareAccelerationDisabled={true}
        initialContentHTML={textData}
        editable={false}
        style={styles.editor}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  editor: {
    backgroundColor: 'white',
  },
});
