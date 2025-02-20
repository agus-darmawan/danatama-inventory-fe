import { create } from 'zustand';

type IState = {
  auth: any;
};

export const useStore = create<IState>(() => ({
  auth: null,
}));
