import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '../schemas/Account';
import { removeExpoToken } from '../services/network/notification';

const STORAGE_KEY = '@intensivetAppSession';

export class SessionRepository {
    async get(): Promise<User | null> {
        const storage = await AsyncStorage.getItem(STORAGE_KEY)
        return storage ? JSON.parse(storage) : null;
    }

    async save(params: any): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(params))
    }

    async clear() {
        await AsyncStorage.clear()
    }
}