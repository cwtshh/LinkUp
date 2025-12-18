import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  addToast,
} from "@heroui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router";
import { registerUser } from "../../services/UserService";

const Register = () => {
  const { t } = useTranslation("register");
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      return;
    }

    try {
      const response = await registerUser({ name, email, password });

      addToast({
        title: response.title || t("userCreatedTitle"),
        color: "success",
      });

      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      addToast({
        title: error.response.data.title || t("userCreationFailedTitle"),
        description: error.response.data.message,
        color: "danger",
      });
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setName(e.target.value)}
              label={t("name")}
              required
              errorMessage={name === "" ? t("nameRequired") : undefined}
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label={t("email")}
              required
              errorMessage={email === "" ? t("emailRequired") : undefined}
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              label={t("password")}
              type={showPassword ? "text" : "password"}
              endContent={
                <Button
                  isIconOnly
                  type="button"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </Button>
              }
              required
              errorMessage={password === "" ? t("passwordRequired") : undefined}
            />
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              label={t("confirmPassword")}
              endContent={
                <Button
                  isIconOnly
                  type="button"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                </Button>
              }
              type={showConfirmPassword ? "text" : "password"}
              required
              errorMessage={
                confirmPassword && confirmPassword !== password
                  ? t("passwordsMustMatch")
                  : undefined
              }
            />

            <Button color="primary" type="submit">
              {t("createAccount")}
            </Button>
          </form>
        </CardBody>
      </Card>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">{t("hasAccount")}</h2>
        <Button onPress={() => navigate("/login")} color="secondary">
          {t("login")}
        </Button>
      </div>
    </div>
  );
};

export default Register;
