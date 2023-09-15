import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { Avatar } from './Avatar';
import { LastMessage } from './LastMessage';
import { VetCaseModel } from '../../../../schemas/VetCase';

interface Props {
  timeStyle: any;
  vetCase: VetCaseModel;
  lastUpdate: string;
  navigateToChat: () => void;
  thereIsUnreadMessages: boolean;
}

const VetCaseComponent = (props: Props) => {
  const { vetCase, navigateToChat, timeStyle, lastUpdate, thereIsUnreadMessages } = props;

  return (
    <TouchableOpacity style={styles.root} onPress={navigateToChat}>
      <Avatar uri={vetCase.clinic?.thumbnail?.service_url} />

      <View style={styles.midSide}>
        <View style={styles.header}>
          <Text style={styles.identification} ellipsizeMode="tail" numberOfLines={1}>
            {`#${vetCase.id} - ${vetCase.clinic.fantasy_name}`}
          </Text>
        </View>

        <LastMessage vetCase={vetCase} />
      </View>

      <View style={styles.rightSide}>
        <Text style={[timeStyle]}>{lastUpdate}</Text>

        {!!thereIsUnreadMessages && (
          <View style={styles.countMessages}>
            <Text style={styles.countMessagesText}>{vetCase.unread_messages}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    marginBottom: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  midSide: {
    flex: 1,
    marginLeft: 10,
    height: '100%',
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
  },
  lastMessage: {
    marginTop: 6,
    color: '#757575',
  },
  lastMessageToUnlessText: {
    marginTop: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  descriptionToMessageUnlessText: {
    marginLeft: 6,
    color: '#757575',
  },
  identification: {
    fontSize: 15,
    marginTop: 6,
    marginRight: 6,
    fontWeight: 'bold',
  },
  rightSide: {
    height: '100%',
    alignItems: 'flex-end',
  },
  countMessages: {
    width: 28,
    height: 28,
    marginTop: 4,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#48BACC',
  },
  countMessagesText: {
    fontSize: 10,
    color: '#fff',
    alignSelf: 'center',
  },
});

export default memo(VetCaseComponent);
