import { useParams } from "react-router";
import MeetControls from "../../components/meet/meetControls/MeetControls";
import { Avatar } from "@heroui/react";
import { useMeetStore } from "../../stores/meetStore";
import { useEffect } from "react";

const Meet = () => {
  const { meet_code } = useParams();
  const { meet, fetchMeet } = useMeetStore();

  useEffect(() => {
    fetchMeet(meet_code || "");
  }, [meet_code]);

  console.log(meet);

  return (
    <div className="bg-neutral-900 w-full h-full text-white p-6 flex flex-col">
      <div className="flex justify-end mb-4">
        <Avatar />
      </div>
      <div className="flex-1"></div>
      <MeetControls />
    </div>
  );
};

export default Meet;
