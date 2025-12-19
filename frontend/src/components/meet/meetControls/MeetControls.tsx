import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { MdCallEnd, MdChat, MdMicOff, MdVideocamOff } from "react-icons/md";
import { useParams } from "react-router";

const MeetControls = () => {
  const { meet_code } = useParams<{ meet_code: string }>();
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-2">
        <p>
          {now.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        |<p>{meet_code}</p>
      </div>

      <div className="flex gap-5">
        <Button isIconOnly>
          <MdMicOff size={20} />
        </Button>

        <Button isIconOnly>
          <MdVideocamOff size={20} />
        </Button>

        <Button color="danger" isIconOnly>
          <MdCallEnd size={20} />
        </Button>
      </div>

      <div>
        <Button isIconOnly>
          <MdChat size={20} />
        </Button>
      </div>
    </div>
  );
};

export default MeetControls;
