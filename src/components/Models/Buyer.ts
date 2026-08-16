import { IBuyer, TBuyerValidation, TPayment } from '../../types';

export class Buyer {
    protected payment: TPayment | '' = '';
    protected email = '';
    protected phone = '';
    protected address = '';

    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.address = data.address;
        }
    }

    getData(): { payment: TPayment | ''; email: string; phone: string; address: string } {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): TBuyerValidation {
        const errors: TBuyerValidation = {};

        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.email) {
            errors.email = 'Укажите емэйл';
        }
        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.address) {
            errors.address = 'Укажите адрес доставки';
        }

        return errors;
    }
}
