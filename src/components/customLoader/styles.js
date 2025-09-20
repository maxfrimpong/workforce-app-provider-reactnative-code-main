import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../utils';
const windowHeight = 500
const windowWidth = 300
const LOADER_SIZE = 80;
const LOADER_SIZE1 = 270;
const styles = StyleSheet.create({
  parentContainer: { position: 'absolute' },
  container: {
    height: LOADER_SIZE,
    width: LOADER_SIZE1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    opacity: 0.7,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    //paddingLeft: 30,
    flexDirection: 'row',
  },
  errorParentView: {
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
    elevation: 10,
  },
  errorContainer: {
    alignItems: 'center',
    width: windowWidth * 0.7,
    position: 'absolute',
    elevation: 10,
    top: windowHeight * 0.4,
    left: (windowWidth * 0.3) / 2,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  errorText: {
    fontSize: 18,
    color: 'black',
  },
  errorTitle: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonText: {
    fontFamily: 'rajdhani-bold',
    fontSize: 18,
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  button: {
    height: 40,
    width: windowWidth * 0.3,
    backgroundColor: colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default styles;
