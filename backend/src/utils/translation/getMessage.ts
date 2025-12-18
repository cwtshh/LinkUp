import { messages } from "../messages/messages";

export const getMessage = (
  lang: string,
  key: keyof (typeof messages)["en"]
): string => {
  const locale = messages[lang as keyof typeof messages] || messages["pt"];
  return locale[key];
};
