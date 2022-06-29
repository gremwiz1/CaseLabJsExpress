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
  OrderNotFound: "Нет заказа с таким id",
  ForbiddenUpdateOrder: "У вас нет прав редактировать заказ",
  OrderSuccessDelete: "Заказ успешно удален",
  ForbiddenDeleteOrder: "У вас нет прав удалить заказ",
  ForbiddenGetAllOrders: "У вас нет прав просматривать все заказы",
  UserNotEnoughBalance: "У вас не хватает баланса для оплаты заказа",
  ProductNotEnoughQuantity: "Не хватает товара на складе",
};
module.exports = ANSWER;
