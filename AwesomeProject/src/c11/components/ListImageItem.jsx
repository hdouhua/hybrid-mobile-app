import React, {useLayoutEffect, useRef} from 'react';
import {Platform, Image, View} from 'react-native';

import {Styles} from '../Styles';

const IsiOS = Platform.OS === 'ios';

function ImageRender({imageUri}) {
  const imageRef = useRef();

  useLayoutEffect(() => {
    if (IsiOS) {
      imageRef.current.setNativeProps({opacity: 0});
      // imageRef.current.setNativeProps({backgroundColor: 'red'});
    }
  }, []);

  const onLoadHandler = () => {
    if (IsiOS) {
      imageRef.current.setNativeProps({opacity: 1});
    }
  };

  return (
    <View style={Styles.itemWrapper}>
      <Image
        ref={imageRef}
        style={Styles.img}
        onLoad={onLoadHandler}
        source={{uri: imageUri}}
      />
    </View>
  );
}

export default React.memo(ImageRender);
