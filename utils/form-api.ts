import { toast } from 'react-toastify'
import { IFormInputs } from '../sections/Form'

export const FormApi = {
  async sendForm(formData: IFormInputs, token: string, chatId: number) {
    const { telegram, email, name, service, message } = formData

    const telegramView = `<b>Telegram</b>: ${telegram}%0A<b>Email</b>: ${email}%0A<b>Имя</b>: ${name}%0A<b>Тип услуги</b>: ${service}%0A<b>Сообщение</b>: ${message}`

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${telegramView}&parse_mode=html`

    await fetch(url)
      .then((response) => response.status)
      .then((status) => {
        if (status == 200) {
          toast.success('Заявка успешно отправлена!')
        }
        if (status !== 200) {
          toast.error('Произошла ошибка :(')
        }
      })
  },
}
