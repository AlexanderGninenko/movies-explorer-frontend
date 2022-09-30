import AuthWithForm from "../AuthWithForm/AuthWithForm";

const Login = ({ onLogin, isLoading }) => {
  return (
    <AuthWithForm
      title="Рады видеть!"
      onAuth={onLogin}
      text="Ещё не зарегистрированы?"
      buttonText="Регистрация"
    >
      <button className="auth__button" type="submit" disabled={isLoading}>
        {isLoading ? "Входим..." : "Войти"}
      </button>
    </AuthWithForm>
  );
};

export default Login;
