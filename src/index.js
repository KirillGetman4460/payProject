const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const stripe = require('stripe')('ваш_секретный_ключ_для_API_Stripe');
const port = 3000;

// Разбор тела запроса в формате JSON
app.use(bodyParser.json())

// Разбор тела запроса в URL-кодированном формате
app.use(bodyParser.urlencoded({ extended: true }));

// Обработка запроса на создание нового платежа
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  // Создание платежного запроса в Stripe с указанной пользователем суммой
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd'
  });

  // Возвращаем клиенту клиентский секрет для выполнения оплаты
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(port, () => {
  console.log(`Приложение доступно на порту ${port}`);
});
