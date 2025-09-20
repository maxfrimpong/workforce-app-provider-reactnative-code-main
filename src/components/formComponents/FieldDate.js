import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Controller} from 'react-hook-form';
import {colors} from '../../utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export const FieldDate = ({
  type,
  msg,
  inputStyle,
  name,
  rules,
  control,
  icon,
  inputViewStyle,
  iconRight,
  format,
  minimumDate,
  maximumDate,
  ...props
}) => {
  // ****** Hooks Functions ****** //

  const [modalOpened, setModalOpened] = useState(false);

  return (
    <View style={styles.mainView}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TouchableOpacity
            onPress={() => setModalOpened(true)}
            style={[styles.inputWrapper, inputViewStyle]}>
            {icon && <Image style={styles.icon} source={icon} />}
            <Text style={inputStyle}>{value}</Text>
            {iconRight && <Image style={styles.icon} source={iconRight} />}
            <DateTimePickerModal
              minimumDate={minimumDate ?? null}
              maximumDate={maximumDate ?? null}
              isVisible={modalOpened}
              mode={type ?? 'date'}
              onConfirm={value => {
                const newValue = moment(value).format(format ?? 'DD-MM-YYYY');
                onChange(newValue);
                setModalOpened(false);
              }}
              onCancel={() => setModalOpened(false)}
            />
          </TouchableOpacity>
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
  },
});
