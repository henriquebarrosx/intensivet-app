import { API } from "../../axios";

export const saveExpoToken = async (accessToken: string, expoToken: string): Promise<void> => {
  return await API.put('/api/v2/expo_token', { expo_push_token: expoToken }, {
    headers: { Authorization: accessToken }
  });
}

export const removeExpoToken = async (accessToken: string): Promise<void> => {
  return await API.put('/api/v2/expo_token', { expo_push_token: '' });
}