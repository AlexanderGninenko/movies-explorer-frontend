import AuthWithForm from "../AuthWithForm/AuthWithForm";

const Login = ({ onLogin, isLoading }) => {

  return (
    <AuthWithForm
      title="Рады видеть!"
      onAuth={onLogin}
      isLoading={isLoading}
      text="Ещё не зарегистрированы?"
      linkText="Регистрация"
      buttonText='Войти'
      
    >
      
    </AuthWithForm>
  );
};

export default Login;
