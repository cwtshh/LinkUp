import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to LinkUp!",
      login: "Login",
      language: "Language",
    },
    home: {
      title: "Video calls with anyone, anywhere",
      description:
        "Connect and collaborate with friends, family, and colleagues wherever you are.",
      knowMore: "Know More",
      login: "Login",
    },
    login: {
      title: "Login",
      description: "Sign in to start using LinkUp",
      email: "Email",
      password: "Password",
      login: "Login",
      noAccount: "Don't have an account?",
      createAccount: "Create one now!",
    },
    register: {
      title: "Register",
      description: "Create an account to start using LinkUp",
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      createAccount: "Create Account",
      hasAccount: "Already have an account?",
      login: "Login here",
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      passwordRequired: "Password is required",
      confirmPasswordRequired: "Confirm Password is required",
      passwordsMustMatch: "Passwords must match",
      userCreatedTitle: "User created successfully.",
      userCreationFailedTitle: "User creation failed.",
    },
  },
  pt: {
    translation: {
      welcome: "Bem-vindo ao LinkUp!",
      login: "Entrar",
    },
    home: {
      title: "Videochamadas com qualquer pessoa, em qualquer lugar",
      knowMore: "Saiba Mais",
      description:
        "Interaja e colabore com amigos, familiares e colegas onde estiver.",
      language: "Idioma",
      login: "Entrar",
    },
    login: {
      title: "Login",
      description: "Entre para começar a usar o LinkUp",
      email: "Email",
      password: "Senha",
      login: "Entrar",
      noAccount: "Ainda não tem conta?",
      createAccount: "Crie uma agora!",
    },
    register: {
      title: "Registrar",
      description: "Crie uma conta para começar a usar o LinkUp",
      name: "Nome",
      email: "Email",
      password: "Senha",
      confirmPassword: "Confirmar Senha",
      createAccount: "Criar Conta",
      hasAccount: "Já tem uma conta?",
      login: "Faça login aqui",
      nameRequired: "Nome é obrigatório",
      emailRequired: "Email é obrigatório",
      passwordRequired: "Senha é obrigatória",
      confirmPasswordRequired: "Confirmar Senha é obrigatório",
      passwordsMustMatch: "As senhas devem coincidir",
      userCreatedTitle: "Usuário criado com sucesso.",
      userCreationFailedTitle: "Falha na criação do usuário.",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
