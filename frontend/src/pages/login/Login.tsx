import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const Login = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-[40%]">
        <CardHeader>
          <span className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl">{t("title")}</h1>
            <p>{t("description")}</p>
          </span>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input label={t("email")} />
            <Input label={t("password")} />

            <Button color="primary" type="submit">
              {t("login")}
            </Button>
          </form>
        </CardBody>
      </Card>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">{t("noAccount")}</h2>
        <Button onPress={() => navigate("/register")} color="secondary">
          {t("createAccount")}
        </Button>
      </div>
    </div>
  );
};

export default Login;
