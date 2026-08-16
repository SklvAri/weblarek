import { IProduct } from '../../types';

export class Products {
    protected items: IProduct[] = [];
    protected selected: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getItems(): IProduct[] {
        return this.items;
    }

    getItem(id: string): IProduct | undefined {
        return this.items.find((item) => item.id === id);
    }

    setSelected(product: IProduct): void {
        this.selected = product;
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}
