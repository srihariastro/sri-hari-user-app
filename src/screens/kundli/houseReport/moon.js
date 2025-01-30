import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { api_astrolist1, api_url, colors, fonts, get_HouseReport, get_panchang, getFontSize } from '../../../config/Constants1';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import MyLoader from '../../../components/MyLoader';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const MoonHouse = ({ navigation, houseReportData }) => {
  const { t } = useTranslation();


  return (
    <View style={{ flex: 1, backgroundColor: colors.black_color1 }}>
      {/* <MyLoader isVisible={isLoading} /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 0,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: '#fafdf6',
            marginVertical: 10,
            borderRadius: 15,
            shadowColor: colors.black_color5,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 6
          }}>
          <View style={styles.itemContainer}>
            <Text allowFontScaling={false} style={styles.itemText}>{houseReportData?.moonReports?.planet}</Text>
            <View>
              <Text allowFontScaling={false} style={{ color: 'black', padding: 10, fontSize: getFontSize(1.8), textAlign: 'justify' }}>
              {houseReportData?.moonReports?.house_report}
              </Text>
            </View>
          </View>



        </View>

      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  houseReportData: state.kundli.houseReportData
})

export default connect(mapStateToProps, null)(MoonHouse);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,

    alignItems: 'center',
    padding: 15,
    alignSelf: 'center'
  },
  itemText: {

    fontSize: getFontSize(1.8),
    color: 'red',
    fontFamily: fonts.medium,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
