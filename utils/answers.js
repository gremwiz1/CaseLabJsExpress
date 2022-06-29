const ANSWER = {
  BadRequest: "Переданы не корректные данные",
  BadRequestUser: "Некорректный id пользователя",
  UserNotFound: "Нет пользователя с таким id",
  UserEmailExist: "Пользователь с таким email уже существует в базе",
  WrongEmailOrPassword: "Неправильная почта или пароль",
  DemandAuthorization: "Необходима авторизация",
  ServerError: "На сервере произошла ошибка",
  ImageNotUrl: "Поле image не является ссылкой",
  NotCorrectEmail: "Некорректная почта",
  NotFoundPage: "Такой страницы не существует",
  NotCorrectUrl: "URL validation err",
  ProductSuccessDelete: "Товар успешно удален",
  NotFoundProduct: "Такого товара не существует",
  ForbiddenDeleteProduct: "У вас нет прав удалять продукт",
  ForbiddenCreateProduct: "У вас нет прав создавать продукт",
  ForbiddenUpdateProduct: "У вас нет прав редактировать продукт",
};
module.exports = ANSWER;
