import { Camera } from "expo-camera";

export const requestCameraPermission = async (): Promise<boolean> => {
  const currentPermission = await Camera.getCameraPermissionsAsync();

  if (currentPermission.status == 'granted') {
    return true;
  }

  const permissionResult = await Camera.requestCameraPermissionsAsync();
  return permissionResult.granted;
}