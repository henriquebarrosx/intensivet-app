import React, { useState } from "react";
import { Switch as SwitchComponent } from "react-native";

import Theme from "../../theme";
import { SwitchArea, SwitchLabel } from "./styles";

interface Props {
  label: string;
  isChecked: boolean;
  changeSwitchValue: (isToggled: boolean) => void;
}

export function Switch({ label, isChecked, changeSwitchValue }: Props) {
  const [isEnabled, setIsEnabled] = useState(isChecked);
  
  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      changeSwitchValue(!previousState)
      return !previousState;
    })
    
  };

  return (
    <SwitchArea>
      <SwitchLabel>{label}</SwitchLabel>

      <SwitchComponent
        value={isEnabled}
        thumbColor={'#FFF'}
        onValueChange={toggleSwitch}
        trackColor={{ false: Theme.COLORS.lightGray, true: Theme.COLORS.primary }}
      />
    </SwitchArea>
  )
}
