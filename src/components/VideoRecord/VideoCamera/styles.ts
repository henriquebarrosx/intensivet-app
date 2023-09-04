import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    aspectRatio: 9 / 16,
    backgroundColor: '#000',
  },
  topSideArea: {
    height: 120,
    width: '100%',
    paddingRight: 20,
    paddingBottom: 36,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  bottomBarContainer: {
		bottom: 0,
    paddingTop: 20,
		paddingBottom: 30,
		alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});