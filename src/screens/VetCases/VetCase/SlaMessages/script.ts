import {VetCase} from "../../../../schemas/VetCase";
import {priorities} from "../../../../utils/priorities";

export function useSlaMessage(vetCase: VetCase) {
  const isFullCase = !!vetCase.priority;
  const bubbleTitle = getBubbleTittle();
  const priorityColor = getPriorityColor();
  const containerStyle = getContainerStyle();

  function getContainerStyle(): Record<string, string> {
    const bgColor = isFullCase ? '#afece482' : '#acace973';
    return {backgroundColor: bgColor};
  }

  function getPriorityColor(): string {
    return priorities.find((value) => {
      return value.priority === vetCase.priority;
    })?.color!;
  }

  function getBubbleTittle(): string {
    return `#${vetCase.id} - ${vetCase.clinic.fantasy_name}`;
  }

  return { isFullCase, bubbleTitle, priorityColor, containerStyle }
}
