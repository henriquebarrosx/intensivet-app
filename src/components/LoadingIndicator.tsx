import React, { Fragment, memo } from "react";
import { StyleSheet, View } from "react-native";
import { DotIndicator } from "react-native-indicators";

interface LoadingIndicatorProps {
  color?: string;
  isLoading: boolean;
}

export const LoadingIndicator = memo((props: LoadingIndicatorProps) => {
  const {isLoading, color = '#F5F5F5'} = props;

  return (
    <Fragment>
      {isLoading && (
        <View style={styles.container}>
          <DotIndicator size={6} color={color} />
        </View>
      )}
    </Fragment>
  )
})

const styles = StyleSheet.create({
  container: {
    height: 30,
  }
});