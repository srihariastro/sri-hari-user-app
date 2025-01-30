import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, Fonts, Sizes} from '../../assets/style';
import LinearGradient from 'react-native-linear-gradient';

const Chats1 = ({comments}) => {
  const [chatData, setChatData] = useState([]);
  // console.log('===',comments);
  useEffect(() => {
    setChatData(comments);
  }, [comments.length]);
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: Sizes.fixPadding,
          transform: [{scaleY: -1}]
        }}>
        <View
          style={{
            width: 35,
            height: 35,
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 1000,
          }}>
          <Text allowFontScaling={false} style={{...Fonts.gray16RobotoMedium}}>{item.fromUser.userName[0]}</Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.black + '50',
            marginLeft: Sizes.fixPadding,
            padding: Sizes.fixPadding,
            borderRadius: Sizes.fixPadding,
          }}>
          <Text allowFontScaling={false} style={{...Fonts.white12RobotoRegular}}>{item.message}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{height: '100%', flex: 1, transform: [{scaleY: -1}]}}>
      <FlatList
        data={chatData.slice().sort((a, b) => a.message_id - b.message_id).reverse()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Chats1;
