import { create } from "zustand";
import type { Meeting } from "../utils/types/MeetingType";
import { addToast } from "@heroui/react";
import { AxiosInstance } from "../services/api/Api";

interface MeetState {
  meet: Meeting | null;
  fetchMeet: (code: string) => Promise<void>;
}

export const useMeetStore = create<MeetState>()((set) => ({
  meet: null,
  fetchMeet: async (code: string) => {
    if (code.trim() === "") {
      set({ meet: null });
      return;
    }

    try {
      const response = await AxiosInstance.get(`/meeting/${code}`);
      set({ meet: response.data.meeting });
    } catch (error) {
      console.log(error);
      addToast({
        title: "Error",
        description: "An error occurred while fetching the meeting.",
        color: "danger",
      });
    }
  },
}));
