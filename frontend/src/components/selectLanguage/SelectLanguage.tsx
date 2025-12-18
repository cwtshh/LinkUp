import { Select, SelectItem } from "@heroui/react";
import { useTranslation } from "react-i18next";

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const trocarIdioma = (lang: string) => i18n.changeLanguage(lang);
  return (
    <Select
      className="min-w-25"
      defaultSelectedKeys={["pt"]}
      disallowEmptySelection
      onChange={(e) => trocarIdioma(e.target.value)}
    >
      <SelectItem key="pt">🇧🇷 PT</SelectItem>
      <SelectItem key="en">🇺🇸 EN</SelectItem>
    </Select>
  );
};

export default SelectLanguage;
