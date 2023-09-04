import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  uri: string | undefined;
}

export function Avatar({ uri }: Props): JSX.Element {
  const [shouldDisplayAlternativeAvatar, displayAlternativeAvatar] = useState(true);

  function handleNonAvatarUriAvailable(): void {
    if (uri) return;
    setAlternativeAvatar();
  }

  function setAlternativeAvatar(): void {
    displayAlternativeAvatar(true);
  }

  useEffect(() => {
    handleNonAvatarUriAvailable();
  }, []);

  if (shouldDisplayAlternativeAvatar) {
    return (
      <View style={styles.alternativeAvatar}>
        <FontAwesome
          size={80}
          color={'#ccc'}
          name="user-circle" />
      </View>
    );
  }

  return (
    <Image
      style={styles.avatar}
      onError={setAlternativeAvatar}
      source={{ uri: uri, cache: 'force-cache' }} />
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 50,
    borderColor: '#ccc'
  },
  alternativeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
