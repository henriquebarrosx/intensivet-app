import { TextInputProps } from 'react-native';
import React, { Fragment, memo, useState } from 'react';
import { mask as useMask } from 'react-native-mask-text';

import SecureText from './SecureText';
import { Content, Input, Label, ValidationMessage } from './styles';

type Mask = 'default' | 'cpf' | 'phoneNumber' | 'date';

interface Props extends TextInputProps {
  mask?: Mask;
  label: string;
  validation?: string;
  clearValidation?: () => void;
  displaySecureIndicator?: boolean;
  onChangeText: (text: string) => void;
}

const InputText = (props: Props) => {
  const {
    label,
    validation,
    onChangeText,
    clearValidation = () => { },
    mask = 'default',
    displaySecureIndicator = false,
    ...others
  } = props;

  const [isVisible, setVisible] = useState(displaySecureIndicator);

  const handleTextChange = (text: string): void => {
    /* https://github.com/akinncar/react-native-mask-text#usage-mask-function */
    const inputType: Record<Mask, string> = {
      default: text,
      date: useMask(text, '99/99/9999'),
      cpf: useMask(text, '999.999.999-99'),
      phoneNumber: useMask(text, '(99) 99999-9999'),
    };

    onChangeText(inputType[mask]);

    if (!!validation && clearValidation) {
      clearValidation();
    }
  };

  return (
    <Fragment>
      <Label>{label}</Label>

      <Content hasError={!!validation}>
        <Input
          {...others}
          secureTextEntry={isVisible}
          onChangeText={handleTextChange}
          hasSecureIndicator={displaySecureIndicator}
        />

        {displaySecureIndicator && (
          <SecureText isVisible={isVisible} changeVisibility={setVisible} />
        )}
      </Content>

      {!!validation && <ValidationMessage>{validation}</ValidationMessage>}
    </Fragment>
  );
};

export default memo(InputText);
