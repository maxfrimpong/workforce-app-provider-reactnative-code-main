import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../components/molecules/Header';
import {bidMatchedStart, bidPlacedStart} from '../../store/modules/job/actions';
import {colors, fonts, images, screenName} from '../../utils';
import {bidTabs} from '../../utils/staticData';

export const MyPortfolio = ({navigation, route}) => {
  // ************** Hooks Functions ************** //

  const dispatch = useDispatch();

  const {bidPlacedData, bidMatchedData} = useSelector(state => ({
    bidPlacedData: state.jobReducer.bidPlacedData,
    bidMatchedData: state.jobReducer.bidMatchedData,
  }));

  const [activeTab, setactiveTab] = useState(0); // 0=Bids Placed, 1=Bids Matched

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      activeTab ? dispatch(bidMatchedStart()) : dispatch(bidPlacedStart());
    });

    return unsubscribe;
  }, [navigation]);

  // ************** Main Functions *************** //

  const handleTabChange = tab => () => {
    setactiveTab(tab);
    tab === 0
      ? dispatch(bidPlacedStart())
      : tab === 1
      ? dispatch(bidMatchedStart())
      : null;
  };

  const handleBidPress = item => () => {
    if (item?.tripStatus == 'bidAcceptedByCustomer') {
      navigation.navigate(screenName.platformCharge, {
        tripId: item?._id,
      });
    } else {
      navigation.navigate(screenName.jobDetails, {
        item,
        flow: 'bid',
      });
    }
  };

  return (
    <View style={styles.mainView}>
      <Header menu borderRound title="My Portfolio" />

      {/* Render Tabs View */}

      <View style={styles.tabsWrapper}>
        {bidTabs.map((item, index) => (
          <TouchableOpacity
            onPress={handleTabChange(index)}
            style={[
              styles.tabWrapper,
              {
                borderBottomWidth: activeTab === index ? 2 : 0,
              },
            ]}>
            <Text
              style={[
                styles.tabTitle,
                {
                  color:
                    activeTab === index ? colors.textBlack : colors.textGrey,
                },
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={activeTab ? bidMatchedData : bidPlacedData}
        keyExtractor={(item, index) => `${index}_jobsList`}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={handleBidPress(item)}
            style={styles.itemWrapper}>
            <Image
              style={styles.itemImage}
              source={
                item?.designImages.length > 0
                  ? {uri: item?.designImages[0]}
                  : images.dummyJobs
              }
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item?.title}</Text>

              <Text style={styles.itemDate}>
                {moment(item?.tripUpdatedAt).format(
                  'DD MMM YYYY HH:mm[(updated)]',
                )}
              </Text>

              <Text style={styles.itemDate}>{item?.tripAddress}</Text>
              {activeTab < 2 && (
                <Text style={styles.dynamicText}>
                  {item?.tripStatus == 'bidPlacedByDriver'
                    ? `Bid Placed`
                    : item?.tripStatus == 'bidAcceptedByCustomer'
                    ? `Customer Accepted Interest`
                    : item?.tripStatus == 'completed'
                    ? `Job Matched`
                    : null}
                </Text>
              )}
            </View>

            {activeTab == 1 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screenName.chat, {
                    customerId: item?.customerId,
                  })
                }
                style={styles.chatWrapper}>
                <Image style={styles.chatIcon} source={images.icChat} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: '10%',
    marginTop: '3%',
  },
  tabWrapper: {
    paddingBottom: 5,
    borderColor: colors.textBlack,
  },
  tabTitle: {
    fontFamily: fonts.secondarySemibold,
    fontSize: 16,
  },
  contentContainerStyle: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  itemWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: '5%',
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
  itemImage: {
    height: 70,
    width: 70,
    borderRadius: 15,
    marginRight: 5,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fonts.trenaryBold,
    fontSize: 14,
    color: colors.textDarkBlack,
    paddingHorizontal: '3%',
  },
  itemDate: {
    fontFamily: fonts.trenaryLight,
    fontSize: 13,
    color: colors.textGrey,
    paddingHorizontal: '3%',
    marginTop: '1%',
  },
  dynamicText: {
    fontFamily: fonts.secondaryMedium,
    fontSize: 14,
    color: colors.textDarkBlack,
    paddingHorizontal: '3%',
  },
  chatWrapper: {
    alignSelf: 'center',
  },
  chatIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});
