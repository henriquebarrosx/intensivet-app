export interface DeviceNotificationsGateway {
    requestPermission(): Promise<boolean>
    getDeviceToken(): Promise<string>
}