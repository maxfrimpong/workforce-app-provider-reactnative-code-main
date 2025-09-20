import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, fonts} from '../../utils';

export const RetryButton = ({
  msg,
  buttonMsg,
  onPress,
  hideButton,
  paddingTop,
}) => {
  return (
    <View
      style={[
        styles.mainView,
        {
          paddingTop,
        },
      ]}>
      <Text style={styles.mainText}>{msg ?? 'No data available'}</Text>
      {!hideButton && (
        <TouchableOpacity onPress={onPress} style={styles.mainButton}>
          <Text style={styles.mainButtonText}>{buttonMsg ?? 'Retry'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  mainText: {
    fontFamily: fonts.secondaryMedium,
    fontSize: 15,
    color: colors.textBlack,
  },
  mainButton: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: '2%',
  },
  mainButtonText: {
    fontFamily: fonts.secondaryMedium,
    fontSize: 13,
    color: colors.white,
  },
});
