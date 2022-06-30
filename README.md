# CaseLabJsExpress

- Этот проект представляет собой функционал бэкенда по созданию пользователей,
  возможность пополнения баланса пользователем, создание карточек товаров,
  оформление заказов по покупке товаров.

-Запустить проект локально можно через команду npm run start - бэк запустится на 4000-м порту.

##API

###Пользователи

- /api/signup - роут для регистрации пользователя - метод Post - обязательные три поля:
  email - электронная почта
  name - имя состоящее от 2 до 30-ти символов
  password - минимум 8 символов

- /api/signin - роут для входа пользователя - метод Post - обязательны два поля:
  email - электронная почта
  password - пароль
  В случае успешного входа выдается токен - который нужно будет передавать при всех остальных запросах - срок действия его 7 дней. (Рекомендуется его хранить в localStorage и при каждом новом запросе его подставлять)

- /api/users/me - роут для получения информации о пользователе - метод Get

- /api/users/me - роут для изменения имени и почты - метод Patch - два обязательных поля:
  name - имя
  email - электронная почта
