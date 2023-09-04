import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '../schemas/Account';
import { removeExpoToken } from '../services/network/notification';

const STORAGE_KEY = '@intensivetAppSession';

export class Session {
  async get(): Promise<User | null> {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)
    return storage ? JSON.parse(storage) : null;
  }

  set(params: any): Promise<void> {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(params))
  }

  async clear() {
    const accessToken = (await this.get())?.current_account.access_token!;
    await removeExpoToken(accessToken);
    return AsyncStorage.clear();
  }
}