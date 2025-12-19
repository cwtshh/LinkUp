import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdAdd, MdKeyboard, MdMeetingRoom, MdWatchLater } from "react-icons/md";
import { useAuthStore } from "../../stores/authStore";
import { AxiosInstance } from "../../services/api/Api";
import { useNavigate } from "react-router";

export type MeetingCreationMode = "now" | "later";

const Landing = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation("landing");
  const [meetCode, setMeetCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateMeeting = async (mode: MeetingCreationMode) => {
    console.log("Create meeting:", mode);

    let payload;
    if (mode === "now") {
      payload = {
        host_id: user?.id,
        password_protected: false,
        startsAt: new Date(),
        endsAt: undefined,
        status: "active",
      };
    }

    setLoading(true);
    try {
      const response = await AxiosInstance.post("/meeting/create", payload);

      addToast({
        title: response.data.title || "Success",
        description: "Meeting created successfully.",
        color: "success",
      });

      navigate(`/meet/${response.data.meeting.code}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error creating meeting:", error);
      addToast({
        title: error.response.data.title || "Error",
        description:
          error.response.data.message ||
          "An error occurred while creating the meeting.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl">{t("title")}</h1>
        <p className="text-lg">{t("subtitle")}</p>
        <div className="flex flex-col items-center gap-4 mt-8">
          <Dropdown>
            <DropdownTrigger>
              <Button
                isLoading={loading}
                color="primary"
                startContent={<MdMeetingRoom />}
              >
                {t("newMeeting")}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key={"new-meeting-now"}
                startContent={<MdAdd />}
                onClick={() => handleCreateMeeting("now")}
              >
                {t("startMeetingNow")}
              </DropdownItem>
              <DropdownItem
                key={"new-meeting-later"}
                startContent={<MdWatchLater />}
                onClick={() => handleCreateMeeting("later")}
              >
                {t("startMeetingLater")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <p> Ou </p>
          <div className="flex items-center gap-4 w-full max-w-md">
            <Input
              placeholder={t("joinByMeetCode")}
              value={meetCode}
              onChange={(e) => setMeetCode(e.target.value)}
              startContent={<MdKeyboard />}
            />
            <Button
              isDisabled={meetCode.trim() === "" || loading}
              isLoading={loading}
              color="primary"
            >
              {t("joinMeet")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
