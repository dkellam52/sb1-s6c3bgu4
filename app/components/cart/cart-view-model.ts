import { Observable, Frame } from '@nativescript/core';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../models/order.model';

export class CartViewModel extends Observable {
    private orderService: OrderService;
    private _cartItems: OrderItem[] = [];
    private _total: number = 0;

    constructor() {
        super();
        this.orderService = new OrderService();
        this.loadCart();
    }

    get cartItems(): OrderItem[] {
        return this._cartItems;
    }

    get total(): number {
        return this._total;
    }

    get hasItems(): boolean {
        return this._cartItems.length > 0;
    }

    private loadCart() {
        const order = this.orderService.getCurrentOrder();
        this._cartItems = order.items;
        this._total = order.total;
        this.notifyPropertyChange('cartItems', this._cartItems);
        this.notifyPropertyChange('total', this._total);
        this.notifyPropertyChange('hasItems', this.hasItems);
    }

    increaseQuantity(args: EventData) {
        const button = args.object as any;
        const item = button.bindingContext as OrderItem;
        this.orderService.updateItemQuantity(item.menuItem.id, item.quantity + 1);
        this.loadCart();
    }

    decreaseQuantity(args: EventData) {
        const button = args.object as any;
        const item = button.bindingContext as OrderItem;
        if (item.quantity > 1) {
            this.orderService.updateItemQuantity(item.menuItem.id, item.quantity - 1);
            this.loadCart();
        }
    }

    removeItem(args: EventData) {
        const button = args.object as any;
        const item = button.bindingContext as OrderItem;
        this.orderService.removeFromOrder(item.menuItem.id);
        this.loadCart();
    }

    goToMenu() {
        Frame.topmost().navigate({
            moduleName: 'components/menu/menu-page',
            clearHistory: true
        });
    }

    goToCheckout() {
        Frame.topmost().navigate('components/checkout/checkout-page');
    }
}