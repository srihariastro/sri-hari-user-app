import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../../config/Constants1';
import RNSpeedometer from 'react-native-speedometer';
import Modal from 'react-native-modal';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ViewShot from 'react-native-view-shot';
import { useRef } from 'react';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as KundliActions from '../../redux/actions/KundliActions'
import MyHeader from '../../components/MyHeader';
import { mainlogo } from '../../assets/images/Images';

const { width, height } = Dimensions.get('screen');

const KundliMatch = ({ navigation, matchingAshtakootPointsData, maleKundliData, femaleKundliData, dispatch }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
    console.log(matchingAshtakootPointsData?.total?.received_points,'alldata')
  const ref = useRef();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SafeAreaView
          style={{ backgroundColor: colors.background_theme2 }}
          forceInset={{ top: 'always', bottom: 'never' }}>
          <View
            style={{
              flex: 0,
              height: Platform.OS == 'android' ? 0 : StatusBar.currentHeight,
              backgroundColor: colors.background_theme2,
            }}>
            <StatusBar
              translucent
              backgroundColor={colors.background_theme2}
              barStyle={'light-content'}
            />
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  flex: 0,
                  width: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="arrow-back"
                  color={colors.white_color}
                  size={25}
                />
              </TouchableOpacity>
              <View style={{ flex: 0 }}>
                <Text allowFontScaling={false}
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    color: colors.white_color,
                    fontFamily: fonts.medium,
                  }}>
                  {t("kundli_matching")}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.white_color,
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 1000,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color8,
                  fontFamily: fonts.medium,
                  marginRight: 5,
                }}>
                {t("share")}
              </Text>
              <Ionicons
                name="logo-whatsapp"
                color={colors.green_color1}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
    });
    
  }, []);

  const share_matching = async () => {
    setModalVisible(false);
    ref.current.capture().then(uri => {
      console.log(uri);
      let options = {
        title:
          'Checkout the AstroRemedy marriage compatibility report for Ranjeet and xxx.',
        url: uri,
      };
      Share.open(options)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0,
            backgroundColor: colors.background_theme2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 50,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text allowFontScaling={false}
            style={{
              fontSize: 20,
              color: colors.black_color,
              fontFamily: fonts.semi_bold,
              marginTop: 15,
              marginBottom: 10,
            }}>
            {t("Compatibility_Score")}
          </Text>
          <RNSpeedometer
            value={matchingAshtakootPointsData?.total?.received_points ?? 0}
            size={width * 0.7}
            maxValue={36}
            allowedDecimals={1}
            innerCircleStyle={{ backgroundColor: colors.background_theme2 }}
            labelWrapperStyle={{
              backgroundColor: colors.black_color,
              alignSelf: 'center',
              paddingHorizontal: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: colors.green_color2,
              marginTop: 25,
            }}
          />
        </View>
        <View style={{ width: '95%', alignSelf: 'center', marginTop: 50 }}>
          <Text allowFontScaling={false}
            style={{
              textAlign: 'center',
              fontFamily: fonts.semi_bold,
              fontSize: 18,
              color: colors.black_color8,
              marginBottom: 20,
            }}>
            {t("details")}
          </Text>
          <View style={{ ...styles.containerBox, backgroundColor: '#deab90' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("varna")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("varna_t")} */}
                {matchingAshtakootPointsData?.varna?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#8a5a44' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#8a5a44',
                }}>
                {`${matchingAshtakootPointsData?.varna?.received_points}/${matchingAshtakootPointsData?.varna?.total_points}`}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.containerBox, backgroundColor: '#ffb3c1' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("love")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("love_t")} */}
                {matchingAshtakootPointsData?.bhakut?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#c9184a' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#c9184a',
                }}>
                {/* {`${matchingData?.bhakut?.received_points}/${matchingData?.bhakut?.total_points}`} */}
                {`${matchingAshtakootPointsData?.bhakut?.received_points}/${matchingAshtakootPointsData?.bhakut?.total_points}`}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.containerBox, backgroundColor: '#cfe1b9' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("mental")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("mental_t")} */}
                {matchingAshtakootPointsData?.maitri?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#87986a' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#87986a',
                }}>
                {`${matchingAshtakootPointsData?.maitri?.received_points}/${matchingAshtakootPointsData?.maitri?.total_points}`}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.containerBox, backgroundColor: '#d7e3fc' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("health")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("health_t")} */}
                {matchingAshtakootPointsData?.nadi?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#00a6fb' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#00a6fb',
                }}>
                {`${matchingAshtakootPointsData?.nadi?.received_points}/${matchingAshtakootPointsData?.nadi?.total_points}`}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.containerBox, backgroundColor: '#fbc3bc' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("dominance")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("dominance_t")} */}
                {matchingAshtakootPointsData?.vashya?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#f38375' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#f38375',
                }}>
                {`${matchingAshtakootPointsData?.vashya?.received_points}/${matchingAshtakootPointsData?.vashya?.total_points}`}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.containerBox, backgroundColor: '#b7efc5' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("temperament")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("temperament_t")} */}
                {matchingAshtakootPointsData?.gan?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#25a244' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#25a244',
                }}>
                {`${matchingAshtakootPointsData?.gan?.received_points}/${matchingAshtakootPointsData?.gan?.total_points}`}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.containerBox, backgroundColor: '#fffae5' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("destiny")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("destiny_t")} */}
                {matchingAshtakootPointsData?.tara?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#ffe14c' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#ffe14c',
                }}>
                {`${matchingAshtakootPointsData?.tara?.received_points}/${matchingAshtakootPointsData?.tara?.total_points}`}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.containerBox, backgroundColor: '#f1a7a9' }}>
            <View style={styles.childContainerBox}>
              <Text allowFontScaling={false} style={styles.heading}>{t("physical")}</Text>
              <Text allowFontScaling={false} style={styles.description}>
                {/* {t("physical_t")} */}
                {matchingAshtakootPointsData?.yoni?.description}
              </Text>
            </View>
            <View style={{ ...styles.circle, borderColor: '#e35053' }}>
              <Text allowFontScaling={false}
                style={{
                  ...styles.circleText,
                  color: '#e35053',
                }}>
                {`${matchingAshtakootPointsData?.yoni?.received_points}/${matchingAshtakootPointsData?.yoni?.total_points}`}
              </Text>
            </View>
          </View>
          <Text allowFontScaling={false}
            style={{
              textAlign: 'center',
              fontFamily: fonts.bold,
              fontSize: 22,
              color: colors.black_color,
              marginVertical: 20,
            }}>
            {t("manglik_r")}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={mainlogo}
                style={{
                  width: width * 0.2,
                  height: width * 0.2,
                  resizeMode: 'contain',
                }}
              />
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color,
                  fontFamily: fonts.semi_bold,
                  marginTop: 10,
                }}>
                {maleKundliData?.name}
              </Text>
              {/* <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.red_color1,
                  fontFamily: fonts.medium,
                  marginTop: 5,
                }}>
                {t("manglik")}
              </Text> */}
              <View
                // onPress={() => {
                //   dispatch(KundliActions.viewKundliFromKundliMatching('male'))
                // }}
                style={{
                  width: '80%',
                  backgroundColor: colors.background_theme2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.black_color,
                    fontFamily: fonts.semi_bold,
                  }}>
                  Male
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/wedding-hands.png')}
                style={{
                  width: width * 0.2,
                  height: width * 0.2,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={mainlogo}
                style={{
                  width: width * 0.2,
                  height: width * 0.2,
                  resizeMode: 'contain',
                }}
              />
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color,
                  fontFamily: fonts.semi_bold,
                  marginTop: 10,
                }}>
                {femaleKundliData?.name}
              </Text>
              {/* <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.red_color1,
                  fontFamily: fonts.medium,
                  marginTop: 5,
                }}>
                {t("manglik")}
              </Text> */}
              <View
                // onPress={() => {
                //   dispatch(KundliActions.viewKundliFromKundliMatching('female'))
                // }}
                style={{
                  width: '80%',
                  backgroundColor: colors.background_theme2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.black_color,
                    fontFamily: fonts.semi_bold,
                  }}>
                  Female
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0,
              padding: 10,
              backgroundColor: colors.background_theme2,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text allowFontScaling={false}
              style={{
                fontSize: 16,
                color: colors.black_color,
                fontFamily: fonts.medium,
              }}>
              {t("astrokunj_conclusion")}
            </Text>
            <View style={{ flex: 1, marginTop: 10 }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 12,
                  color: colors.black_color,
                  fontFamily: fonts.semi_bold,
                }}>
                {matchingAshtakootPointsData?.conclusion?.report}
              </Text>
            </View>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('astroForChat')}
              style={{
                flex: 0,
                backgroundColor: colors.background_theme1,
                marginTop: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color,
                  fontFamily: fonts.semi_bold,
                }}>
                {t("chat_with_astrologer")}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                flex: 0,
                backgroundColor: colors.background_theme1,
                marginTop: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.black_color,
                  fontFamily: fonts.semi_bold,
                }}>
                {t("share_my")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        deviceWidth={width}
        deviceHeight={Dimensions.get('window').height}
        backdropColor={colors.black_color}
        onBackdropPress={() => setModalVisible(false)}
        onDismiss={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <ViewShot
          ref={ref}
          options={{ fileName: 'Your-File-Name', format: 'jpg', quality: 0.9 }}
          style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../assets/images/space-start.jpeg')}
            style={{ width: '100%', height: '100%', alignSelf: 'center' }}>
            <View
              style={{
                flex: 0.2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../../assets/images/astro-booster.png')}
                style={{
                  width: width * 0.08,
                  height: width * 0.08,
                  resizeMode: 'contain',
                }}
              /> */}
              <Text allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: colors.background_theme2,
                  fontFamily: fonts.semi_bold,
                  marginLeft: 5,
                }}>
                AstroRemedy
              </Text>
            </View>
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={mainlogo}
                  style={{
                    width: width * 0.9,
                    height: width * 0.13,
                    resizeMode: 'contain',
                  }}
                />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.background_theme1,
                    fontFamily: fonts.semi_bold,
                    marginTop: 10,
                  }}>
                  {maleKundliData?.name}
                </Text>
                {/* <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.red_color1,
                    fontFamily: fonts.medium,
                    marginTop: 5,
                  }}>
                  {t("manglik")}
                </Text> */}
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/wedding-hands.png')}
                  style={{
                    width: width * 0.2,
                    height: width * 0.2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={mainlogo}
                  style={{
                    width: width * 0.13,
                    height: width * 0.13,
                    resizeMode: 'contain',
                  }}
                />
                <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.background_theme1,
                    fontFamily: fonts.semi_bold,
                    marginTop: 10,
                  }}>
                  {femaleKundliData?.name}
                </Text>
                {/* <Text allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: colors.red_color1,
                    fontFamily: fonts.medium,
                    marginTop: 5,
                  }}>
                 {t("manglik")}
                </Text> */}
              </View>
            </View>
            <View style={{ flex: 0.42 }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 14,
                  color: colors.background_theme2,
                  fontFamily: fonts.semi_bold,
                  textAlign: 'center',
                }}>
                {t("Compatibility_Score")}
              </Text>
              <RNSpeedometer
                value={matchingAshtakootPointsData?.total?.received_points ?? 0}
                size={width * 0.5}
                maxValue={36}
                allowedDecimals={1}
                innerCircleStyle={{ backgroundColor: colors.black_color }}
                labelStyle={{
                  color: colors.background_theme1,
                  fontFamily: fonts.medium,
                  fontSize: 14,
                }}
                labelNoteStyle={{ fontSize: 12, fontFamily: fonts.medium }}
                labelWrapperStyle={{
                  backgroundColor: colors.black_color,
                  alignSelf: 'center',
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: colors.green_color2,
                  marginTop: 25,
                }}
              />
            </View>
            <LinearGradient
              colors={[colors.background_theme2, colors.background_theme1]}
              style={{
                flex: 0.3,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 10,
              }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 16,
                  color: colors.black_color,
                  fontFamily: fonts.bold,
                  textAlign: 'center',
                }}>
                {t("astrokunj_conclusion")}
              </Text>
              <Text allowFontScaling={false}
                style={{
                  fontSize: 12,
                  color: colors.black_color,
                  fontFamily: fonts.medium,
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {/* {matchingData?.conclusion?.report} */}
                {matchingAshtakootPointsData?.conclusion?.report}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </ViewShot>

        <TouchableOpacity
          onPress={share_matching}
          activeOpacity={0.8}
          style={{
            flex: 0,
            backgroundColor: colors.background_theme2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <Text allowFontScaling={false}
            style={{
              fontSize: 16,
              color: colors.background_theme1,
              fontFamily: fonts.medium,
            }}>
            {t("share")}
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  matchingAshtakootPointsData: state.kundli.matchingAshtakootPointsData,
  maleKundliData: state.kundli.maleKundliData,
  femaleKundliData: state.kundli.femaleKundliData,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(KundliMatch);

const styles = StyleSheet.create({
  containerBox: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background_theme3,
    borderRadius: 10,
    shadowColor: colors.black_color5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 15,
  },
  childContainerBox: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 16,
    color: colors.black_color,
    fontFamily: fonts.semi_bold,
    marginBottom: 15,
  },
  description: {
    fontSize: 13,
    color: colors.black_color,
    fontFamily: fonts.medium,
  },
  circle: {
    flex: 0,
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 1000,
    borderWidth: 8,
    borderColor: colors.green_color2,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 22,
    color: colors.green_color2,
    fontFamily: fonts.bold,
  },
});
