import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  uri: string;
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
          size={53}
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
    width: 55,
    height: 55,
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: '#ccc',
  },
  alternativeAvatar: {
    width: 55,
    height: 55,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
