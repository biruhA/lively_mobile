import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

interface Props {
  text: string;
}
export const RichText = ({text}: Props) => {
  const richText = useRef();

  return (
    <View style={styles.container}>
      <RichEditor
        ref={richText}
        initialContentHTML={text}
        editable={false}
        style={styles.editor}
      />
    </View>
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
