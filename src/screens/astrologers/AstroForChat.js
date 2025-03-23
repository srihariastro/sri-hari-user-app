import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { api_astrolist1, colors, fonts } from '../../config/Constants1';
import { api_url } from '../../config/constants';
import MyLoader from '../../components/MyLoader';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyHeader from '../../components/MyHeader';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import * as AstrologerActions from '../../redux/actions/AstrologerActions';
import { base_url } from '../../config/constants';
import * as ChatActions from '../../redux/actions/ChatActions';
import { Colors, Sizes } from '../../assets/style';
import Stars from 'react-native-stars';
import HomeHeader from '../../components/HomeHeader';
import { ActivityIndicator } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import CustomBottomSheet from '../../components/CustomBottomSheet';

const { width, height } = Dimensions.get('screen');

let timeout;

const AstroForChat = ({
  chatListData,
  navigation,
  dispatch,
  isRefreshing,
  isMoreLoading
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [noData, setNoData] = useState(false); // Added state for handling no data
  const [filterShowStatus, setFilterShowStatus] = useState("Initials");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [skillData, setSkillData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      dispatch(AstrologerActions.getChatAstroData());
      return () => setSearch('');
    }, [dispatch])
  );

  useEffect(() => {
    if (chatListData) {
      setChatData(chatListData)
    }
  }, [chatListData])

  const searchFilterFunction = text => {
    setSearch(text);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(AstrologerActions.getChatAstroData(text));
      clearTimeout(timeout);
    }, 1500);
  };

  useEffect(() => {
    setNoData(chatData?.length === 0 && search.length > 0)
  }, [chatData, search]);

  const rounditem = item => {
    const wallet = item.toString();
    return wallet.slice(0, 4);
  };

  const api_getSkills = async () => {
    try {
      const resp = await axios.get(`${api_url}admin/get-skill`)

      const customize_data = resp?.data?.skills && resp?.data?.skills?.map((item) => {
        return {
          label: item.skill,
          value: item?._id
        }
      })
      setSkillData(customize_data);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    api_getSkills()
  }, [])



  const handleFilterApply = () => {
    try {
      setModalVisible(false)
      setFilterShowStatus("filter");
      if (selectedFilter === 'language' && selectedValue) {
        const filterData = chatListData && chatListData?.filter((item) =>
          item?.language?.includes(selectedValue)
        );
        console.log(filterData, "filterData");
        setChatData(filterData);
        return;
      }
      else if (selectedFilter === 'gender' && selectedValue) {
        const filterData = chatListData && chatListData?.filter((item) => {
          item?.gender === selectedValue
        });
        console.log(filterData, "filterData");
        setChatData(filterData);
        return;
      }
      else if (selectedFilter === 'Skills' && selectedValue) {
        const filterData = chatListData && chatListData?.filter((item) => {
          item?.skill?.includes(selectedValue);
        });
        console.log(filterData, "filterData");
        setChatData(filterData);
        return;
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleRefershSearch = () => {
    try {
      setSearch('');
      setFilterShowStatus("Initials");
      dispatch(AstrologerActions.onRefreshChatAstrologer());
      dispatch(AstrologerActions.getChatAstroData());
    }
    catch (err) {
      console.log(err)
    }
  }

  const getStatusColor = status => {
    switch (status) {
      case 'online':
        return '#29bf12';
      case 'offline':
        return '#00000040';
      case 'busy':
        return '#fca311';
      default:
        return 'white';
    }
  };

  const renderItems = ({ item, index }) => {
    const onChat = astroData => {
      const payload = {
        type: 'chat',
        astrologerName: astroData?.astrologerName,
        language: astroData?.language,
        astrologerId: astroData?._id,
        chatPrice: parseFloat(astroData?.chat_price) + parseFloat(astroData?.commission_chat_price),
        astrostatus: astroData?.chat_status,
      };
      dispatch(ChatActions.onChatNow(payload));
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate('astrologerDetailes', {
            _id: item?._id,
            type: 'chat',
          })
        }
        key={index}
        style={{
          flex: 0,
          width: width * 0.95,
          marginHorizontal: width * 0.025,
          alignSelf: 'center',
          backgroundColor: colors.white_color,
          borderRadius: 50,
          marginVertical: 10,
          shadowColor: colors.black_color5,
          shadowOffset: { width: 2, height: 1 },
          shadowOpacity: 5,
          shadowRadius: 10,
          zIndex: 100,
          elevation: 5,

        }}
      >
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            backgroundColor: colors.background_theme1,
            borderRadius: 16,
            elevation: 3,
            paddingBottom: 0,
          }}
        >
          <View style={{ width: '30%', height: '100%' }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                overflow: 'hidden',
                // padding: 2,
                marginVertical: 10,
                marginHorizontal: 12
              }}
            >
              <Image
                source={{ uri: base_url + item.profileImage }}
                style={{
                  width: width * 0.23,
                  height: width * 0.25,
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: colors.black_color8,
                  resizeMode: 'cover',
                  marginBottom: 5,
                }}
              />
              <View style={{ flex: 0.3, alignItems: 'center' }}>
                {/* <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 13,
                    color: colors.black_color,
                    fontFamily: fonts.medium,
                    marginTop: 5,
                    textAlign: 'center',
                  }}
                >
                  {`${parseFloat(item?.rating).toFixed(0) ?? 1}/5`}
                </Text> */}
                <Stars
                  default={item?.rating ?? 1}
                  disabled
                  count={5}
                  half={true}
                  starSize={20}
                  fullStar={<Ionicons name={'star'} size={10} color={"#f7b31c"} />}
                  emptyStar={<Ionicons name={'star-outline'} size={10} color={"#f7b31c"} />}
                  halfStar={<Ionicons size={14} name={'star-half'} style={{ color: Colors.primaryLight }} />}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 9,
                    color: "#bababa",
                    fontFamily: fonts.medium,
                    marginTop: 1,
                    textAlign: 'center',
                  }}>
                  Review:({item?.totalRating})
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0, width: '70%', padding: 20, paddingBottom: 5, }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 14,
                color: colors.black_color9,
                fontFamily: fonts.semi_bold,
                textAlign: 'left',
                fontWeight: 'bold'
              }}
            >
              {item.astrologerName}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color9,
                fontFamily: fonts.semi_bold,
                textAlign: 'left'
              }}
            >
              {`Experience: ${item.experience} Year`}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color9,
                fontFamily: fonts.semi_bold,
                textAlign: 'left'
              }}
            >
              {`Language: ${item?.language.join(', ')}`}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 12,
                color: colors.black_color9,
                fontFamily: fonts.semi_bold,
                textAlign: 'left'
              }}
            >
              {`Followers: ${item?.follower_count}`}
            </Text>
            <TouchableOpacity
              disabled={item?.chat_status === 'offline' || item?.chat_status === 'busy'}
              onPress={() => onChat(item)}
              style={{
                flex: 0,
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: "flex-end",
                padding: 10,
                backgroundColor: getStatusColor(item?.call_status),
                marginVertical: 15,
                borderRadius: 10,
              }}
            >
              <Ionicons name="chatbubble-ellipses-sharp" color={"#fff"} size={12} />
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: fonts.medium,
                  marginLeft: 5
                }}
              >
                {`₹ ${rounditem(parseFloat(item?.chat_price) + parseFloat(item?.commission_chat_price))}/min`}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 10,
              width: "15%",
              marginVertical: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              // paddingHorizontal: 10,
              // paddingVertical: Sizes.fixPadding * 0.1,


            }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: getStatusColor(item?.chat_status),
                //margin: 5, 
              }}
            >

            </View>
            <Text
              allowFontScaling={false}
              style={{
                color: getStatusColor(item.chat_status),
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'capitalize',
              }}>
              {item.chat_status}
            </Text>
          </View>
          {/* <View
            style={{
              position: 'absolute',
              paddingHorizontal: 10,
              paddingVertical: Sizes.fixPadding * 0.1,
              right: 0,
              width: '25%',
              borderTopRightRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: getStatusColor(item.chat_status)
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'capitalize'
              }}
            >
              {item.chat_status}
            </Text>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  // console.log(chatListData, "chatListData")

  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      <MyLoader isVisible={isLoading} />
      <HomeHeader navigation={navigation} />
      {/* <View style={{flex:1}} >

      </View> */}
      <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 8 }}>

        {
          filterShowStatus === "Initials" ? (
            <>
              {
                filtershow()
              }
              <FlatList
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
                  setSearch('');
                  dispatch(AstrologerActions.onRefreshChatAstrologer());
                }} />}
                ListHeaderComponent={<>{chatListData && astrologerInfo()}</>}
                ListFooterComponent={<View style={{ height: 50 }}>
                  {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
                </View>}
                onEndReached={() => dispatch(AstrologerActions.getMoreChatAstroData(search))}
              />

            </>
          ) : (
            <>
              {
                filterShowStatus === "Search" ? (
                  <>
                    {searchInfo()}
                    {chatData && chatData?.length === 0 ? (
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.white_color, fontSize: 16, fontFamily: fonts.medium, color: "black" }}>
                          No Data Found
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
                          setSearch('');
                          dispatch(AstrologerActions.onRefreshChatAstrologer());
                        }} />}
                        ListHeaderComponent={<>{chatData && astrologerInfo()}</>}
                        ListFooterComponent={<View style={{ height: 50 }}>
                          {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
                        </View>}
                        onEndReached={() => dispatch(AstrologerActions.getMoreChatAstroData(search))}
                      />

                    )
                    }
                  </>
                ) : (
                  <>
                    {
                      filterShowStatus === "filter" && (
                        <>
                          {
                            filtershow()
                          }
                          {chatData && chatData?.length === 0 ? (
                            <View style={{ flex: 1, alignItems: "center" }}>
                              <Text style={{ color: colors.white_color, fontSize: 16, fontFamily: fonts.medium, color: "black" }}>
                                No Data Found
                              </Text>
                            </View>
                          ) : (
                            <FlatList
                              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
                                setSearch('');
                                dispatch(AstrologerActions.onRefreshChatAstrologer());
                              }} />}
                              ListHeaderComponent={<>{chatData && astrologerInfo()}</>}
                              ListFooterComponent={<View style={{ height: 50 }}>
                                {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
                              </View>}
                              onEndReached={() => dispatch(AstrologerActions.getMoreChatAstroData(search))}
                            />

                          )
                          }
                        </>
                      )

                    }
                  </>
                )
              }
            </>
          )
        }

      </View>
      {filterOptions()}
    </View>
  );

  function filtershow() {
    return (
      <>
        <View style={{ flex: 1, marginBottom: 20, flexDirection: "row" }}>
          <View style={{ flex: 0.4, flexDirection: "row", gap: 5 }}>
            <TouchableOpacity
              onPress={() => {
                setFilterShowStatus("Search")
              }}
              style={{ width: 40, height: 40, borderRadius: 50, alignItems: "center", justifyContent: "center", backgroundColor: colors.background_theme6, }}
            >
              <Ionicons name="search" color={colors.black_color} size={22} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ width: 100, height: 40, borderRadius: 22, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.background_theme6, }}>
              <Ionicons name="filter" color={colors.black_color} size={22} />
              <Text style={{ color: colors.black_color }}>Filter</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.6, flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
            {skillData && skillData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedValue(item?.value)}
                style={{

                  width: 100, height: 40,
                  backgroundColor: "#f0f0f0",
                  color: "black",
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "black", fontSize: 16, }}>
                  {item?.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </>
    )
  }

  function astrologerInfo() {
    return (
      <FlatList
        data={chatData}
        renderItem={renderItems}
        keyExtractor={item => item?._id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 50 }}>
          {isMoreLoading && <ActivityIndicator color={Colors.primaryLight} size={'small'} />}
        </View>}
        onEndReached={() => dispatch(AstrologerActions.getMoreChatAstroData(search))}
      />
    );
  }

  function searchInfo() {
    return (
      <View
        style={{
          flex: 0,
          backgroundColor: colors.background_theme1,
          //paddingVertical: 10,
        }}
      >
        <View
          style={{
            flex: 0,
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 1000,
            backgroundColor: colors.background_theme6,
            height: 50
          }}
        >
          <Ionicons name="search" color={colors.black_color6} size={22} />
          <TextInput
            value={search}
            placeholder="Search Astrologer by name..."
            placeholderTextColor={colors.black_color6}
            onChangeText={text => searchFilterFunction(text)}
            style={{
              width: '88%',
              fontSize: 17,
              fontFamily: fonts.medium,
              color: colors.black_color8,
            }}
          />
          <Ionicons name="refresh"
            color={colors.black_color6} size={22}
            onPress={handleRefershSearch}
          />

        </View>
      </View>
    );
  }

  function filterOptions() {
    return (
      <CustomBottomSheet visible={modalVisible} onClose={() => setModalVisible(false)} title="Sort & Filter">
        <View style={{ flexDirection: 'row', height: "100%" }}>
          <View style={{ flexDirection: "column", flex: 0.5, backgroundColor: colors.background_theme6, padding: 20 }}>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => setSelectedFilter('gender')}>
                <Text style={{ color: Colors.black }}>Gender</Text>
              </TouchableOpacity>

            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => setSelectedFilter('Skills')}>
                <Text style={{ color: Colors.black }}>Skills</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => setSelectedFilter('language')}>
                <Text style={{ color: Colors.black }}>Language</Text>
              </TouchableOpacity>
            </View>
          </View>


          {/* Right Side: Options Based on Selection */}
          <View style={{ flex: 1, flexDirection: "column", }}>
            {selectedFilter === 'gender' && (
              <View style={{ width: "50%", padding: 20 }}>

                <RadioButton.Group onValueChange={value => setSelectedValue(value)} value={selectedValue}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Male" color="black" /><Text style={{ color: Colors.black }}>Male</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Female" color="black" /><Text style={{ color: Colors.black }}>Female</Text>
                  </View>
                </RadioButton.Group>
              </View>
            )}
            {selectedFilter === 'language' && (
              <View style={{ width: "50%", padding: 20 }}>
                <RadioButton.Group onValueChange={value => setSelectedValue(value)} value={selectedValue}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Hindi" color="black" /><Text style={{ color: 'black' }}>Hindi</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="English" color="black" /><Text style={{ color: 'black' }}>English</Text>
                  </View>
                </RadioButton.Group>
              </View>
            )}
            {selectedFilter === 'Skills' && (
              <View style={{ width: "50%", padding: 20 }}>
                {skillData && skillData.map((item, index) => (
                  <RadioButton.Group onValueChange={value => setSelectedValue(value)} value={selectedValue}
                  >

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <RadioButton value={item?.value} color="black" />
                      <Text style={{ color: "black", }}>
                        {item?.label}
                      </Text>
                    </View>
                  </RadioButton.Group>
                ))
                }
              </View>

            )}
            <View style={{ position: 'absolute', bottom: 60, width: "100%", alignItems: "center" }}>
              <TouchableOpacity onPress={handleFilterApply} style={{ width: "85%", backgroundColor: colors.background_theme5, padding: 10, alignItems: 'center', borderRadius: 20 }}>
                <Text style={{ color: 'white' }}>Apply</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>



      </CustomBottomSheet>
    )
  }
};

const mapStateToProps = state => ({
  chatListData: state.astrologer.chatListData,
  isRefreshing: state.setting.isRefreshing,
  isMoreLoading: state.setting.isMoreLoading
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AstroForChat);
