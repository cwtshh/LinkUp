import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";

const Login = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/landing");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
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
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={t("email")}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={t("password")}
              type="password"
            />

            <Button isLoading={isLoading} color="primary" type="submit">
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
