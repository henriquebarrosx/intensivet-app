import AsyncStorage from "@react-native-async-storage/async-storage"
import { SessionRepository } from "./session-repository"

export const sessionRepository = new SessionRepository(AsyncStorage)