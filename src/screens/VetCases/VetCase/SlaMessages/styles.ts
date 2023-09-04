import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  root: {
    display: "flex",
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  classification: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  midSide: {
    flex: 1,
    marginLeft: 10,
    height: "100%",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
  },
  petName: {
    marginTop: 8,
    marginLeft: 2,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  identification: {
    fontSize: 14,
    marginRight: 6,
    fontWeight: "bold",
  },
  rightSide: {
    height: "100%",
    alignItems: "flex-end",
  },
  countMessages: {
    width: 28,
    height: 28,
    marginTop: 4,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#48BACC",
  },
  countMessagesText: {
    fontSize: 10,
    color: "#fff",
    alignSelf: "center",
  },
  slaTimerContainer: {
    marginTop: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  clockIcon: {
    marginRight: 6,
  },
  stopWatch: {
    color: '#424242',
    fontWeight: 'bold',
  }
});

