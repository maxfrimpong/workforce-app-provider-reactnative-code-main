import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Controller} from 'react-hook-form';
import {colors, fonts} from '../../utils';
import Modal from 'react-native-modal';
import {images} from '../../utils';
import {country} from './country';

export const PhoneFieldInput = ({
  type,
  msg,
  inputStyle,
  name,
  rules,
  control,
  icon,
  inputViewStyle,
  flagValue,
  onSelectCode,
  countryCode,
  disable,
  ...props
}) => {
  // ******************** Hooks Functions ******************** //

  const [isModal, setisModal] = useState(false);
  const [countryList, setCountryList] = useState(country);
  const [searchText, setSearchText] = useState('');

  // ******************** Hooks Functions ******************** //

  const handleSearch = txt => {
    setSearchText(txt);
    const updatedList = country.filter(item => item.name.search(txt) !== -1);
    setCountryList(updatedList);
  };

  const onItemPress = item => () => {
    onSelectCode(item.dialCode, item.emoji);
    setisModal(false);
  };

  const renderModalItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.itemList}
        onPress={onItemPress(item)}>
        <View style={{flexDirection: 'row'}}>
          <Text>{item.emoji}</Text>
          <Text
            style={[
              styles.itemListText,
              {
                width: '70%',
              },
            ]}>
            {item.name}
          </Text>
        </View>
        <View>
          <Text style={styles.itemListText}>{item.dialCode}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={isModal}
        style={styles.modalStyles}
        animationInTiming={1000}
        animationOutTiming={1000}>
        <SafeAreaView style={styles.modalView}>
          <View style={styles.crossBar}>
            <TouchableOpacity
              onPress={() => setisModal(false)}
              style={styles.crossButtonWrapper}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              onChangeText={handleSearch}
              value={searchText}
            />
          </View>
          <FlatList
            data={countryList}
            renderItem={renderModalItem}
            keyExtractor={item => `countryCode_${item.code}`}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Modal>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[styles.inputWrapper, inputViewStyle]}>
            <TouchableOpacity
              disabled={disable ? true : false}
              onPress={() => setisModal(true)}
              style={styles.codeView}>
              <Text>{`${flagValue}   ${countryCode}   `}</Text>
              <Image style={styles.dropdown} source={images.icDropDown} />
            </TouchableOpacity>

            <TextInput
              editable={disable ? false : true}
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              keyboardType="phone-pad"
              placeholderTextColor={colors.textGrey}
              {...props}
            />
          </View>
        )}
        rules={rules}
        name={name}
        defaultValue=""
      />
      {msg && <Text style={styles.errorMsg}>{msg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  codeView: {
    marginRight: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdown: {
    height: 10,
    width: 10,
    tintColor: colors.textGrey,
  },
  errorMsg: {
    fontSize: 12,
    color: colors.red,
    marginBottom: '2%',
    fontFamily: fonts.primaryRegular,
  },
  modalStyles: {
    margin: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  crossButtonWrapper: {},
  crossButton: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingLeft: '5%',
  },
  itemListText: {marginLeft: '5%'},
  crossBar: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: '3%',
    alignItems: 'flex-end',
  },
  searchBar: {
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginBottom: '3%',
  },
  searchInput: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    padding: 0,
    margin: 0,
    width: '100%',
  },
});
