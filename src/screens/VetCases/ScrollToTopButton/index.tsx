import React, { Fragment, memo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import colors from "../../../utils/colors";
import { useVetCases } from "../../../context/VetCasesContext";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface Props {
  isVisible: boolean;
}

export default memo(({ isVisible }: Props) => {
  const { virtualizedListRef } = useVetCases();

  const scrollToBottom = () => {
    virtualizedListRef?.current?.scrollToIndex({ index: 0 });
  }

  return (
    <Fragment>
      {isVisible && (
        <TouchableOpacity onPress={scrollToBottom} style={styles.root}>
          <FontAwesome
            size={22}
            style={styles.icon}
            color={colors.gray}
            name="angle-double-up"
          />
        </TouchableOpacity>
      )}
    </Fragment>
  );
})

const styles = StyleSheet.create({
  root: {
    width: 35,
    right: 15,
    height: 35,
    bottom: 40,
    elevation: 5,
    borderRadius: 100,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    alignSelf: 'center',
  }
})
