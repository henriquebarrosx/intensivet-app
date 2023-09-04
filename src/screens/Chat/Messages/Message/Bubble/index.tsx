import React, { memo } from 'react';
import { WithChildren } from '../../../../../@types/common';
import { ContainerArea, DoctorName, MessageTime } from './styles';
import { getCurrentDatetime, isToday, time } from '../../../../../utils/dates';

interface BubbleProps extends WithChildren {
  isAdmin: boolean;
  isSender: boolean;
  createdAt: string;
  doctorName: string;
}

function Bubble({ isAdmin, isSender, createdAt, doctorName, children }: BubbleProps) {
  const messageTime = getMessageTime();

  function getMessageTime(): string {
    return isToday(createdAt) ? time(createdAt) : getCurrentDatetime(createdAt); 
  }

  return (
    <ContainerArea isSender={isSender}>
      <DoctorName isVisible={!isSender} isAdmin={isAdmin}>
        {doctorName}
      </DoctorName>

      {children}

      <MessageTime isSender={isSender}>
        {messageTime}
      </MessageTime>
    </ContainerArea>
  );
}

export default memo(Bubble);