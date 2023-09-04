import * as ImagePicker from 'expo-image-picker';

export const requestMediaLibraryPermission = async (): Promise<boolean> => {
    const currentPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (currentPermission.status == 'granted') {
        return true;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return permissionResult.granted;
}