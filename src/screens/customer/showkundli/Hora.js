import {View, Text} from 'react-native';
import React from 'react';
import ChartComponent from './ChartComponent';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {api2_get_chart, api_url} from '../../../config/Constants1';
import MyLoader from '../../../components/MyLoader';
import { useFocusEffect } from '@react-navigation/native';
const Hora = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  
  useFocusEffect(
    React.useCallback(() => {
      test();
    }, [])
  );

  const test = async() => {
    setIsLoading(true);
    await axios({
      method: 'post',
      url: api_url + api2_get_chart,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        kundli_id: props.route.params.data.kundali_id,
        chartid:'D2'
      },
    }).then((res)=>
    {
      console.log('rest',res.data);
      setChartData(res.data.png);
      setIsLoading(false);
    }).catch(err=>{
      setIsLoading(false);
      console.log('dsafasd===',err)
    });
  }

  return (
    <View style={{flex: 1}}>
      <MyLoader isVisible={isLoading} />
      <ChartComponent  title='Hora' png={chartData} planetData={props.route.params.planetData} />
    </View>
  );
};
export default Hora