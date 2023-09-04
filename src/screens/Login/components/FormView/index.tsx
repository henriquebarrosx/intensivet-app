import { View } from "react-native";
import React, { Dispatch, Fragment, SetStateAction } from "react";

import { styles } from "./styles";
import { Form } from "../../viewModel";
import InputTextField from "../../../../components/InputTextField";

interface Props {
  formData: Form;
  validations: Partial<Form>;
  onFormChange: Dispatch<SetStateAction<Form>>;
  onValidationChange: Dispatch<SetStateAction<Partial<Form>>>;
}

export const FormView = (props: Props) => {
  const { formData, validations, onFormChange, onValidationChange } = props;

  const onChangeText = (text: string, field: keyof Form): void => {
    onFormChange((fields) => ({ ...fields, [field]: text }));
  };

  const clearValidationMessage = (field: keyof Form): void => {
    onValidationChange((validations) => ({ ...validations, [field]: '' }));
  }

  return (
    <Fragment>
      <InputTextField
        label="E-mail"
        value={formData.email}
        autoCapitalize={'none'}
        validation={validations.email}
        keyboardType={'email-address'}
        placeholder="Digite seu e-mail"
        onChangeText={(text) => onChangeText(text, 'email')}
        clearValidation={() => clearValidationMessage('email')}
      />

      <View style={styles.spacingTop}>
        <InputTextField
          label="Senha"
          placeholder="Senha"
          displaySecureIndicator
          autoCapitalize={'none'}
          value={formData.password}
          validation={validations.password}
          onChangeText={(text) => onChangeText(text, 'password')}
          clearValidation={() => clearValidationMessage('password')}
        />
      </View>
    </Fragment>
  )
}