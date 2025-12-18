import { Button, Navbar, NavbarBrand, NavbarItem } from "@heroui/react";
import { useTranslation } from "react-i18next";
import Logo from "../logo/Logo";
import SelectLanguage from "../selectLanguage/SelectLanguage";
import { useNavigate } from "react-router";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Navbar>
      <NavbarBrand>
        <Logo size="sm" />
      </NavbarBrand>
      <NavbarItem className="ml-auto">
        <div className="flex gap-2 items-center">
          <SelectLanguage />
        </div>
      </NavbarItem>
      <NavbarItem>
        <Button color="primary" onPress={() => navigate("/login")}>
          {t("login")}
        </Button>
      </NavbarItem>
    </Navbar>
  );
};

export default Header;
