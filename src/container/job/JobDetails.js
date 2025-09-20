import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BottomButton } from "../../components/atoms";
import { CustomMap } from "../../components/molecules";
import { Header } from "../../components/molecules/Header";
import { colors, fonts, images, screenName } from "../../utils";

export const JobDetails = ({ navigation, route }) => {
  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    setJobDetails(route?.params?.item);
  }, []);

  console.log(route, navigation);

  return (
    <View style={styles.mainView}>
      <Header
        back
        title={route?.params?.flow === "bid" ? "Bid Details" : "Job Details"}
      />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {route?.params?.flow === "bid" &&
        jobDetails?.tripStatus === "completed" ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(screenName.chat, {
                customerId: jobDetails?.customerId,
              })
            }
            style={styles.chatWrapper}
          >
            <Image style={styles.chatIcon} source={images.icChat} />
          </TouchableOpacity>
        ) : null}

        {route?.params?.flow === "bid" ? (
          <>
            <Text style={styles.fieldHeading}>Customer Name</Text>

            <Text style={styles.requestDesc}>
              {`${jobDetails?.customerRefId?.firstName} ${jobDetails?.customerRefId?.lastName}`}
            </Text>
          </>
        ) : null}

        <Text style={styles.fieldHeading}>Request title</Text>
        <Text style={styles.titleDesc}>{jobDetails?.title}</Text>

        <Text style={styles.fieldHeading}>Request description</Text>
        <Text style={styles.requestDesc}>{jobDetails?.description}</Text>

        <Text style={styles.fieldHeading}>Service required</Text>
        <Text style={styles.requestDesc}>{jobDetails?.service}</Text>

        <View style={styles.horizontalView}>
          <View style={styles.horizontalItem}>
            <Text style={styles.fieldHeading}>From</Text>
            <View style={styles.dateTimeWrapper}>
              <Image style={styles.dateIcon} source={images.icCalender} />
              <Text style={styles.dateTime}>{jobDetails.fromDate}</Text>
            </View>
          </View>

          <View style={styles.horizontalItem}>
            <Text style={styles.fieldHeading}>To</Text>
            <View style={styles.dateTimeWrapper}>
              <Image style={styles.dateIcon} source={images.icCalender} />
              <Text style={styles.dateTime}>{jobDetails.toDate}</Text>
            </View>
          </View>
        </View>

        {/* <CustomMap
                    location={{
                        name: jobDetails?.tripAddress,
                        location: {
                            latitude: jobDetails?.tripLocation?.coordinates[1] ?? 0.00,
                            longitude: jobDetails?.tripLocation?.coordinates[0] ?? 0.00
                        }
                    }}
                /> */}

        <Text style={styles.fieldHeading}>Location</Text>
        <View style={styles.dateTimeWrapper}>
          <Image style={styles.dateIcon} source={images.icCurrentLocation} />
          <Text numberOfLines={1} style={styles.dateTime}>
            {jobDetails?.tripAddress}
          </Text>
        </View>

        {jobDetails?.budget ? (
          <>
            <Text style={styles.fieldHeading}>Budget</Text>

            <Text style={styles.requestDesc}>{jobDetails?.budget}</Text>
          </>
        ) : null}

        {jobDetails?.designImages && jobDetails?.designImages.length > 0 ? (
          <>
            <Text style={styles.fieldHeading}>Design</Text>

            <View style={styles.designWrapper}>
              {jobDetails?.designImages.map((item) => (
                <Image style={styles.designImage} source={{ uri: item }} />
              ))}
            </View>
          </>
        ) : null}

        {jobDetails?.dimensions ? (
          <>
            <Text style={styles.fieldHeading}>Dimensions</Text>

            <Text style={styles.requestDesc}>{jobDetails?.dimensions}</Text>
          </>
        ) : null}

        {route?.params?.flow === "home" ? (
          <BottomButton
            onPress={() =>
              navigation.navigate(screenName.placeBid, {
                tripId: jobDetails?._id,
              })
            }
            name="Show Interest"
            mainStyle={{
              marginTop: "15%",
              marginBottom: "5%",
            }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: "8%",
    paddingVertical: "5%",
  },
  fieldHeading: {
    fontSize: 14,
    fontFamily: fonts.primaryBold,
    color: colors.textBlack,
    alignSelf: "flex-start",
    marginTop: "3%",
  },
  titleDesc: {
    fontSize: 18,
    fontFamily: fonts.trenaryBold,
    color: colors.black,
    alignSelf: "flex-start",
    marginTop: "3%",
  },
  requestDesc: {
    fontSize: 12,
    fontFamily: fonts.trenaryLight,
    color: colors.textGrey,
    alignSelf: "flex-start",
    marginTop: "3%",
  },
  horizontalView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  horizontalItem: {
    width: "47%",
  },
  dateTimeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "3%",
  },
  dateIcon: {
    height: 23,
    width: 23,
    resizeMode: "contain",
    marginRight: "3%",
  },
  dateTime: {
    fontSize: 13,
    fontFamily: fonts.trenaryMedium,
    color: colors.textGrey,
    width: "90%",
  },
  designWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "3%",
  },
  designImage: {
    height: 90,
    width: "30%",
    marginRight: 15,
    borderRadius: 8,
  },
  chatWrapper: {
    position: "absolute",
    top: "6%",
    right: "8%",
  },
  chatIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
