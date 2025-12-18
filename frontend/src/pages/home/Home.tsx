import { Button, Image } from "@heroui/react";
import { useTranslation } from "react-i18next";
import homeImage from "../../assets/home/homeImg.png";

const Home = () => {
  const { t } = useTranslation("home");
  return (
    <div>
      <div className="flex items-center justify-center gap-20 ">
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="font-bold text-3xl">{t("title")}</h1>
          <p className="text-xl"> {t("description")}</p>
          <div className="w-full flex gap-5">
            <Button color="primary">{t("login")}</Button>
            <Button>{t("knowMore")}</Button>
          </div>
        </div>
        <div className="w-1/2">
          <Image src={homeImage} />
        </div>
      </div>

      <div>
        <p>Participe de uma reunião agora Insira o código</p>
      </div>
    </div>
  );
};

export default Home;
