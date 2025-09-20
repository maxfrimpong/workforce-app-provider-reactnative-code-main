import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {colors, fonts} from '../../utils';
import axios from 'axios';
import config from '../../config';
import Geolocation from '@react-native-community/geolocation';

export const FieldPlaces = ({
  disable,
  type,
  msg,
  inputStyle,
  name,
  rules,
  control,
  icon,
  inputViewStyle,
  locationType,
  handleLocation,
  initialValue,
  iconRight,
  autoFetch,
  ...props
}) => {
  /******************** Hooks Functions **********************/

  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    initialValue ? setInputValue(initialValue) : null;
    autoFetch ? fetchCurrentLocation() : null;
  }, []);

  /******************** Component methods ********************/

  const onInputChange = txt => {
    if (txt.length > 0) {
      setIsOpen(true);
      setInputValue(txt);
      axios({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        params: {
          key: config.GOOGLE_MAPS_APIKEY,
          input: txt,
          components: 'country:gh',
        },
      })
        .then(response => {
          console.log('google API response=====', response);
          setResults(response.data.predictions);
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      setIsOpen(false);
      setInputValue(txt);
    }
  };

  const handleItemSelect = selectedItem => () => {
    setIsOpen(false);
    setInputValue(selectedItem?.description);
    let result;
    if (locationType === 'name') {
      result = selectedItem.name;
      handleLocation(result);
    } else if (locationType === 'location') {
      axios({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/place/details/json',
        params: {
          key: config.GOOGLE_MAPS_APIKEY,
          place_id: selectedItem?.place_id,
        },
      })
        .then(response => {
          console.log('google API response=====', response);
          result = {
            name: selectedItem.description,
            location: {
              latitude: response?.data?.result?.geometry.location.lat,
              longitude: response?.data?.result.geometry.location.lng,
            },
          };
          handleLocation(result);
        })
        .catch(error => {
          alert(error.message);
        });
    }
    setSelection({
      start: 0,
      end: 0,
    });
    console.log('handled location After select', result);
  };

  const fetchCurrentLocation = () => {
    setIsOpen(false);
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info?.coords;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${config.GOOGLE_MAPS_APIKEY}`,
        )
          .then(response => response.json())
          .then(responseJson => {
            setInputValue(responseJson.results[0].formatted_address);
            const newItem = {
              name: responseJson.results[0].formatted_address,
              location: {
                latitude,
                longitude,
              },
            };
            handleLocation(newItem);
            setSelection({
              start: 0,
              end: 0,
            });
            console.log('Current Location', newItem);
          })
          .catch(error => {
            errorToast(error.message);
          });
      },
      e => {
        console.log('Geolocation Error', e);
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <View style={styles.mainView}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <View style={[styles.inputWrapper, inputViewStyle]}>
              {icon && <Image style={styles.icon} source={icon} />}
              <TextInput
                onFocus={() => setSelection(null)}
                editable={disable ? false : true}
                selection={selection}
                style={inputStyle}
                onBlur={onBlur}
                onChangeText={txt => onInputChange(txt)}
                value={inputValue}
                secureTextEntry={type === 'password' ? true : false}
                autoCapitalize={type === 'email' ? 'none' : 'sentences'}
                keyboardType={type === 'email' ? 'email-address' : 'default'}
                placeholderTextColor={colors.textGrey}
                {...props}
              />
              {iconRight && (
                <TouchableOpacity onPress={fetchCurrentLocation}>
                  <Image style={styles.icon} source={iconRight} />
                </TouchableOpacity>
              )}
            </View>
            {msg && <Text style={styles.errorMsg}>{msg}</Text>}
            {results && results.length > 0 && isOpen === true && (
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#ececec',
                  width: '100%',
                  paddingHorizontal: '5%',
                  paddingBottom: 15,
                  marginBottom: 15,
                  borderRadius: 20,
                  maxHeight: 200,
                }}>
                <FlatList
                  data={results}
                  keyExtractor={(item, index) => `${index}_PlacesList`}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={handleItemSelect(item)}
                      style={{
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#ececec',
                      }}>
                      <Text
                        style={{
                          color: '#050505',
                          fontFamily: fonts.primaryRegular,
                          fontSize: 13,
                        }}>
                        {item?.description}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </>
        )}
        rules={rules}
        name={name}
        defaultValue=""
      />
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
  icon: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
    marginRight: '4%',
  },
  errorMsg: {
    fontSize: 12,
    color: colors.red,
    marginBottom: '2%',
    fontFamily: fonts.primaryRegular,
  },
});
