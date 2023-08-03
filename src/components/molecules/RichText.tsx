import React, {useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

interface Props {
  text: string;
}
export const RichText = ({text}: Props) => {
  const richText = useRef();

  return (
    <ScrollView style={styles.container}>
      <RichEditor
        ref={richText}
        usecontainer={true}
        androidHardwareAccelerationDisabled={true}
        initialContentHTML={text}
        editable={false}
        disabled={true}
        style={styles.editor}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  editor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    height: 50,
    backgroundColor: '#EEE',
  },
});
