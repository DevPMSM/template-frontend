import { userType } from "@/types/user";
import { create } from "zustand";

type UserStoreProps = {
  users: userType[];
  setUsers: (users: userType[]) => void;
  addUser: (user: userType) => void;
  editUser: (updated: userType) => void;
  removeUser: (id: number | string) => void;
};

export const useUsersStore = create<UserStoreProps>(
  (set) => ({
    users: [],

    setUsers: (users) => set({ users }),

    addUser: (users) =>
      set((state) => ({
        users: [users, ...state.users],
      })),

    editUser: (updated) =>
      set((state) => ({
        users: state.users.map((n) =>
          n.id === updated.id ? updated : n
        ),
      })),

    removeUser: (id) =>
      set((state) => ({
        users: state.users.filter((n) => n.id !== id),
      })),
  })
);
