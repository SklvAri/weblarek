import './scss/styles.scss';

import { Api } from './components/base/Api';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Products } from './components/Models/Products';
import { ShopApi } from './components/ShopApi';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();

const api = new Api(API_URL);
const shopApi = new ShopApi(api);

console.log('--- Каталог товаров ---');

productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getItems());

const firstProduct = productsModel.getItem(apiProducts.items[0].id);
console.log('Товар по id: ', firstProduct);

if (firstProduct) {
    productsModel.setSelected(firstProduct);
}
console.log('Товар для подробного отображения: ', productsModel.getSelected());

console.log('--- Корзина ---');

console.log('Товары в корзине до добавления: ', basketModel.getItems());
console.log('Количество товаров в корзине до добавления: ', basketModel.getCount());
console.log('Стоимость корзины до добавления: ', basketModel.getTotal());

if (firstProduct) {
    basketModel.add(firstProduct);
}
const secondProduct = productsModel.getItem(apiProducts.items[1].id);
if (secondProduct) {
    basketModel.add(secondProduct);
}

console.log('Товары в корзине после добавления: ', basketModel.getItems());
console.log('Количество товаров в корзине: ', basketModel.getCount());
console.log('Стоимость всех товаров в корзине: ', basketModel.getTotal());
console.log('Товар с первым id есть в корзине: ', basketModel.has(apiProducts.items[0].id));
console.log('Товар с третьим id есть в корзине: ', basketModel.has(apiProducts.items[2].id));

if (firstProduct) {
    basketModel.remove(firstProduct);
}
console.log('Товары в корзине после удаления: ', basketModel.getItems());
console.log('Количество товаров после удаления: ', basketModel.getCount());
console.log('Стоимость корзины после удаления: ', basketModel.getTotal());

basketModel.clear();
console.log('Товары в корзине после очистки: ', basketModel.getItems());
console.log('Количество товаров после очистки: ', basketModel.getCount());
console.log('Стоимость корзины после очистки: ', basketModel.getTotal());

console.log('--- Покупатель ---');

console.log('Данные покупателя до заполнения: ', buyerModel.getData());
console.log('Ошибки валидации пустых данных: ', buyerModel.validate());

buyerModel.setData({ address: 'Санкт-Петербург, ул. Восстания, 1' });
console.log('Данные покупателя после сохранения адреса: ', buyerModel.getData());
console.log('Ошибки валидации после сохранения адреса: ', buyerModel.validate());

buyerModel.setData({
    payment: 'card',
    email: 'test@test.ru',
    phone: '+71234567890',
});
console.log('Данные покупателя после заполнения остальных полей: ', buyerModel.getData());
console.log('Ошибки валидации после заполнения всех полей: ', buyerModel.validate());

buyerModel.clear();
console.log('Данные покупателя после очистки: ', buyerModel.getData());
console.log('Ошибки валидации после очистки: ', buyerModel.validate());

console.log('--- Запрос каталога с сервера ---');

shopApi.getProducts()
    .then((data) => {
        productsModel.setItems(data.items);
        console.log('Каталог товаров с сервера, сохранённый в модели: ', productsModel.getItems());
    })
    .catch((error) => {
        console.error('Ошибка при получении каталога с сервера: ', error);
    });
