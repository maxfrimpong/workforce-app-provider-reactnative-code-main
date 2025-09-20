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
import {colors, fonts, images} from '../../utils';

export const FieldInput = ({
  disable,
  type,
  msg,
  inputStyle,
  name,
  rules,
  control,
  icon,
  inputViewStyle,
  mainViewStyle,
  ...props
}) => {
  // ****** Hooks Functions ****** //

  const [hidePassword, sethidePassword] = useState(
    type === 'password' ? true : false,
  );

  return (
    <View style={[styles.mainView, mainViewStyle]}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[styles.inputWrapper, inputViewStyle]}>
            {icon && <Image style={styles.icon} source={icon} />}
            <TextInput
              editable={disable ? false : true}
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry={hidePassword}
              autoCapitalize={type === 'email' ? 'none' : 'sentences'}
              keyboardType={type === 'email' ? 'email-address' : 'default'}
              placeholderTextColor={colors.textGrey}
              {...props}
            />
            {/* Render Make Password Visible */}
            {type === 'password' && (
              <TouchableOpacity onPress={() => sethidePassword(!hidePassword)}>
                <Image
                  style={styles.iconRightStyle}
                  source={hidePassword ? images.icCloseEye : images.icOpenEye}
                />
              </TouchableOpacity>
            )}
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
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: '4%',
  },
  iconRightStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: '4%',
  },
  errorMsg: {
    fontSize: 12,
    color: colors.red,
    marginBottom: '2%',
    fontFamily: fonts.primaryRegular,
  },
});
