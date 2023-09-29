import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "../../../schemas/Account"

export class SessionRepository {
    private STORAGE_KEY = "@intensivetAppSession"

    async get(): Promise<User | null> {
        const storage = await AsyncStorage.getItem(this.STORAGE_KEY)
        return storage ? JSON.parse(storage) : null
    }

    async save(params: User): Promise<void> {
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(params))
    }

    async update(params: Partial<User>): Promise<void> {
        const existentsField = await this.get()
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify({ ...existentsField, params }))
    }

    async clear(): Promise<void> {
        await AsyncStorage.clear()
    }
}