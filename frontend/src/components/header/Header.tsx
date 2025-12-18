import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarItem,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import Logo from "../logo/Logo";
import SelectLanguage from "../selectLanguage/SelectLanguage";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

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
      {!user && (
        <NavbarItem>
          <Button color="primary" onPress={() => navigate("/login")}>
            {t("login")}
          </Button>
        </NavbarItem>
      )}
      {user && (
        <NavbarItem>
          <div className="flex gap-2 items-center">
            <Button isIconOnly radius="full">
              <IoIosSettings size={30} />
            </Button>
            <Dropdown>
              <DropdownTrigger>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={"logout"}
                  onPress={logout}
                  startContent={<IoLogOut />}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarItem>
      )}
    </Navbar>
  );
};

export default Header;
