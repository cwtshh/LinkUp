export const getLang = (req: any) => {
  const header = req.headers["accept-language"] || "en";
  return header.startsWith("pt") ? "pt" : "en";
};
