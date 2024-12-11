import { Observable, Frame } from '@nativescript/core';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem } from '../../models/order.model';

interface DeliveryAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export class CheckoutViewModel extends Observable {
    private orderService: OrderService;
    private _isPickup: boolean = true;
    private _address: DeliveryAddress = {
        street: '',
        city: '',
        state: '',
        zip: ''
    };
    private _orderItems: OrderItem[] = [];
    private _subtotal: number = 0;
    private _deliveryFee: number = 5;

    constructor() {
        super();
        this.orderService = new OrderService();
        this.loadOrder();
    }

    get isPickup(): boolean {
        return this._isPickup;
    }

    set isPickup(value: boolean) {
        if (this._isPickup !== value) {
            this._isPickup = value;
            this.notifyPropertyChange('isPickup', value);
            this.notifyPropertyChange('total', this.total);
        }
    }

    get address(): DeliveryAddress {
        return this._address;
    }

    get orderItems(): OrderItem[] {
        return this._orderItems;
    }

    get subtotal(): number {
        return this._subtotal;
    }

    get deliveryFee(): number {
        return this._deliveryFee;
    }

    get total(): number {
        return this._subtotal + (this._isPickup ? 0 : this._deliveryFee);
    }

    private loadOrder() {
        const order = this.orderService.getCurrentOrder();
        this._orderItems = order.items;
        this._subtotal = order.total;
        this.notifyPropertyChange('orderItems', this._orderItems);
        this.notifyPropertyChange('subtotal', this._subtotal);
        this.notifyPropertyChange('total', this.total);
    }

    async placeOrder() {
        if (!this._isPickup) {
            const address = `${this._address.street}, ${this._address.city}, ${this._address.state} ${this._address.zip}`;
            this.orderService.setDeliveryAddress(address);
        }

        try {
            await this.orderService.submitOrder();
            Frame.topmost().navigate({
                moduleName: 'components/order-confirmation/order-confirmation-page',
                clearHistory: true
            });
        } catch (error) {
            console.error('Failed to place order:', error);
            // Handle error appropriately
        }
    }
}