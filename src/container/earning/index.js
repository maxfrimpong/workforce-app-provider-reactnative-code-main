import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {Header} from '../../components/molecules';
import config from '../../config';
import {apiConfig, colors, fonts} from '../../utils';

export const Earning = ({navigation, route}) => {
  const [activeTab, setActiveTab] = useState(0);

  const user = useSelector(state => state.loginReducer.loginData);

  const today = `${config.API_URL}${apiConfig.today}${user?._id}`;
  const week = `${config.API_URL}${apiConfig.week}${user?._id}`;

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={{backgroundColor: colors.primary}} />
      <Header title="Jobs" menu borderRound />
      <View style={styles.tabView}>
        <TouchableOpacity
          onPress={() => setActiveTab(!activeTab)}
          style={[
            styles.tabItem,
            {
              borderBottomWidth: activeTab ? 0 : 0.5,
            },
          ]}>
          <Text style={styles.tabText}>DAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(!activeTab)}
          style={[
            styles.tabItem,
            {
              borderBottomWidth: activeTab ? 0.5 : 0,
            },
          ]}>
          <Text style={styles.tabText}>WEEK</Text>
        </TouchableOpacity>
      </View>
      <WebView source={{uri: activeTab ? week : today}} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabView: {
    flexDirection: 'row',
  },
  tabItem: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
  },
  tabText: {
    fontFamily: fonts.primaryBold,
    fontSize: 13,
    color: colors.textBlack,
  },
});
