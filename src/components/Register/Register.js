import AuthWithForm from "../AuthWithForm/AuthWithForm";

const Register = ({ onRegister, isLoading }) => {
  return (
    <AuthWithForm
      title="Добро пожаловать!"
      onAuth={onRegister}
      isLoading={isLoading}
      text="Уже зарегистрированы?"
      linkText="Войти"
      buttonText="Зарегистрироваться"
    >
    </AuthWithForm>
  );
};

export default Register;
