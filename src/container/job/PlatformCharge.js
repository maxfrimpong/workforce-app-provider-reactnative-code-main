import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { BottomButton } from "../../components/atoms/BottomButton";
import { screenName } from "../../utils";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";
import { images } from "../../utils/images";

export const PlatformCharge = ({ navigation, route }) => {
  const adminSettings = useSelector((state) => state.homeReducer.adminSettings);

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={styles.mainView}>
        <Image style={styles.screenImage} source={images.icTY} />

        <Text style={styles.amount}>Congratulations!!</Text>
        <Text style={styles.platformCharge}>
          User has successfully accepted your request.
        </Text>

        <Text style={styles.amount}>
          GH&#x20B5;
          {adminSettings[0]?.App_Settings?.providerPlatformFee ?? "0"}
        </Text>
        <Text style={styles.platformCharge}>Commissions Will Be Applied</Text>

        <BottomButton
          onPress={() =>
            navigation.navigate(screenName.paymentMethod, {
              tripId: route?.params?.tripId,
              back: true,
            })
          }
          name="Make Paymnet"
          mainStyle={{
            marginTop: "5%",
          }}
        />

        <BottomButton
          onPress={() => navigation.goBack()}
          name="Cancel"
          mainStyle={{
            marginTop: "7%",
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    paddingHorizontal: "8%",
  },
  screenImage: {
    height: 180,
    width: 180,
    resizeMode: "contain",
    alignSelf: "center",
  },
  amount: {
    fontFamily: fonts.secondaryBold,
    fontSize: 28,
    color: colors.textBlack,
    marginTop: "5%",
    alignSelf: "center",
  },
  platformCharge: {
    fontFamily: fonts.secondaryLight,
    fontSize: 16,
    color: colors.textGrey,
    marginTop: "2%",
    alignSelf: "center",
    textAlign: "center",
  },
});
