import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Consult from '../screens/Consult';
import Services from '../screens/Services';
import Article from '../screens/Article';
import Home from '../screens/home/Home';
import Hometab from '../screens/home/HomeTab';
import AstroForCall from '../screens/astrologers/AstroForCall';
import AstroForChat from '../screens/astrologers/AstroForChat';
import AstroBlogs from '../screens/customer/AstroBlogs';
import AstroLive from '../screens/customer/AstroLive';
import AstroDate from '../screens/customer/AstroDate';
import {colors, fonts, getFontSize} from '../config/Constants1';
const {width, height} = Dimensions.get('screen');
import {useTranslation} from 'react-i18next';
import LiveList from '../screens/live/LiveList';
import {connect} from 'react-redux';
import * as AstrologerActions from '../redux/actions/AstrologerActions';
import AstroForVideo from '../screens/astrologers/AstroForVideo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../assets/style';
import TabHomeSignal from '../assets/svg/TabHome_Signal.svg';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const {t} = useTranslation();
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={
              label == 'astroForChat' ? styles.middleButton : styles.tabButton
            }>
            {label == 'home3' ? (
              <Image
                source={require('../assets/images/icon/home.png')}
                style={{
                  width: width * 0.06,
                  height: width * 0.06,
                  tintColor: isFocused ? colors.white_color : 'black', // Active and inactive check
                }}
              />
            ) : label == 'astroForCall' ? (
              <Image
                source={require('../assets/images/icon/call.png')}
                style={{
                  width: width * 0.06,
                  height: width * 0.06,
                  tintColor: isFocused ? colors.white_color : 'black', // Active and inactive check
                }}
              />
            ) : label == 'astroForChat' ? (
              <>
                <Image
                  source={{
                    uri: 'https://static-00.iconduck.com/assets.00/phone-icon-1561x2048-qjhf7be8.png',
                  }}
                  style={{
                    width: width * 0.06,
                    height: width * 0.06,
                    resizeMode: 'contain',
                    tintColor: isFocused ? 'white' : 'black', // Active and inactive check
                  }}
                />
                <Text
                  style={{
                    color: isFocused ? colors.white_color : 'black', // Active and inactive check
                    fontFamily: fonts.medium,
                    fontSize: getFontSize(1.4),
                  }}>
                  {t('call')} {/* Change text for 'astroForChat' tab */}
                </Text>
              </>
            ) : label == 'astroLive' ? (
              <Image
                source={require('../assets/images/icon/Chat_icons.png')}
                style={{
                  width: width * 0.07,
                  height: width * 0.07,
                  tintColor: isFocused ? 'white' : 'black', // Active and inactive check
                }}
              />
            ) : label == 'astroForVideo' ? (
              <Image
                source={require('../assets/images/icon/Video_Icons.png')}
                style={{
                  width: width * 0.07,
                  height: width * 0.08,
                  tintColor: isFocused ? 'white' : 'black', // Active and inactive check
                  resizeMode: 'contain',
                }}
              />
            ) : null}

            {/* Render text for other tabs except 'astroForChat' and 'astroForVideo' */}
            {label != 'astroForChat' && label != 'astroForVideo' ? (
              <Text
                allowFontScaling={false}
                style={{
                  color: isFocused ? colors.white_color : 'black', // Active and inactive check
                  fontFamily: fonts.medium,
                  fontSize: getFontSize(1.4),
                }}>
                {label == 'home3'
                  ? t('home')
                  : label == 'astroForCall'
                  ? t('call')
                  : label == 'astroLive'
                  ? t('chat')
                  : label == 'astroForVideo'
                  ? t('video')
                  : null}
              </Text>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNavigator = props => {
  useEffect(() => {
    props?.dispatch(AstrologerActions.getLiveAstrologerData());
  }, [props.dispatch]);

  return (
    <Tab.Navigator
      initialRouteName={props.route.params?.flag == 1 ? 'astroDate' : 'home3'}
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false, headerShadowVisible: false}}>
      <Tab.Screen name="astroLive" component={AstroForChat} />
      {/* <Tab.Screen name="astroForCall" component={AstroForCall} /> */}
      <Tab.Screen name="home3" component={Home} />
      <Tab.Screen name="astroForChat" component={AstroForChat} />
      {/* <Tab.Screen name="astroForChat" component={LiveList} /> */}
      {/* <Tab.Screen name="astroblogs" component={AstroBlogs} /> */}
      {/* <Tab.Screen name="astroForVideo" component={AstroForVideo} /> */}
    </Tab.Navigator>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background_theme5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors.white_color,
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.3,
    // paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
  },
  middleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    backfaceVisibility: 'hidden',
    shadowColor: colors.black_color8,
    shadowOpacity: 0.3,
  },
});
