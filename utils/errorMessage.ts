export const errorMessage = (message) => {
  switch (message) {
    case 'Invalid identifier or password':
      return 'Неверный логин или пароль'
    case 'An error occurred during account creation':
      return 'Пользователь с таким логином уже существует'
    case 'Email is already taken':
      return 'Такой email уже существует'
    case 'This email does not exist':
      return 'Эта почта не существует'
    case 'Incorrect code provided':
      return 'Неверная ссылка'
    case 'Your account email is not confirmed':
      return 'Ваша почта не подтверждена'
    default:
      return message
  }
}
