import { API } from "../../axios";
import { AxiosResponse } from "axios";
import { User } from "../../../schemas/Account";

interface SignIn {
  email: string;
  password: string;
  expo_push_token?: string;
}

export const signIn = async (formData: SignIn): Promise<AxiosResponse<Pick<User, 'current_account' | 'clinic' | 'vet'>>> => {
  return await API.post('/api/v2/login', formData);
}