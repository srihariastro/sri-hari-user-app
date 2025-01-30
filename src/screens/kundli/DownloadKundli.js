import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AstroCallList from '../screens/customer/AstroCallList';
import AstroChatList from '../screens/customer/AstroChatList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useEffect} from 'react';
import {colors, fonts} from '../config/Constants1';
import MyStatusBar from '../components/MyStatusbar';
import OpenKundli from '../screens/kundli/OpenKundli';
import NewKundli from '../screens/kundli/NewKundli';
import MyHeader from '../components/MyHeader';
import OpenKundliDownload from '../screens/customer/OpenKundliDownload';
import { useTranslation } from 'react-i18next';
const Tab = createMaterialTopTabNavigator();

const DownloadKundali = props => {
  const {t} = useTranslation();
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      header: () => (
        <MyHeader
          title={t("kundli")}
          navigation={props.navigation}
          statusBar={{
            backgroundColor: colors.background_theme2,
            barStyle: 'light-content',
          }}
        />
      ),    });
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen name="openKundli" component={OpenKundliDownload} />
      <Tab.Screen name="newKundli" component={NewKundli} />
    </Tab.Navigator>
  );
};

export default DownloadKundali;
