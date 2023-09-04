import { createRef } from "react";
import { NavigationContainerRef } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface RouteNavigation {
  navigation: Navigation;
}

export type Navigation = NativeStackNavigationProp<any>;

export const navigationRef = createRef<NavigationContainerRef<any>>();
