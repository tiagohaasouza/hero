import { storeToRefs } from 'pinia';
import { useUserStore } from '@stores/user';

export interface UserProfile {
  name: string;
  surname: string;
  role: string;
  status: string;
  email: string;
  avatar: string;
  preferences: {
    theme: string;
    language: string;
  };
}

export function useUser() {
  const userStore = useUserStore();

  const loadUser = (profile: UserProfile) => {
    userStore.updateUser(profile);
  };

  const updateUser = (partial: Partial<UserProfile>) => {
    userStore.updateUser({ ...userStore.$state, ...partial } as UserProfile);
  };

  const clearUser = () => {
    userStore.$reset();
  };

  return {
    ...storeToRefs(userStore),
    loadUser,
    updateUser,
    clearUser,
  };
}

export default useUser;
