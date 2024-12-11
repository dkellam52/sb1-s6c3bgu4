import { Observable } from '@nativescript/core';
import { Order, OrderItem } from '../models/order.model';
import { MenuItem } from '../models/menu-item.model';

export class OrderService extends Observable {
    private currentOrder: Order = {
        id: '',
        items: [],
        total: 0,
        type: 'pickup',
        status: 'pending',
        createdAt: new Date()
    };

    getCurrentOrder(): Order {
        return this.currentOrder;
    }

    addToOrder(item: OrderItem) {
        const existingItem = this.currentOrder.items.find(i => i.menuItem.id === item.menuItem.id);
        
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.currentOrder.items.push(item);
        }
        
        this.updateTotal();
        this.notifyPropertyChange('currentOrder', this.currentOrder);
    }

    updateItemQuantity(itemId: string, quantity: number) {
        const item = this.currentOrder.items.find(i => i.menuItem.id === itemId);
        if (item) {
            item.quantity = quantity;
            this.updateTotal();
            this.notifyPropertyChange('currentOrder', this.currentOrder);
        }
    }

    removeFromOrder(itemId: string) {
        this.currentOrder.items = this.currentOrder.items.filter(
            item => item.menuItem.id !== itemId
        );
        this.updateTotal();
        this.notifyPropertyChange('currentOrder', this.currentOrder);
    }

    private updateTotal() {
        this.currentOrder.total = this.currentOrder.items.reduce(
            (sum, item) => sum + item.menuItem.price * item.quantity,
            0
        );
    }

    setDeliveryAddress(address: string) {
        this.currentOrder.address = address;
        this.currentOrder.type = 'delivery';
        this.notifyPropertyChange('currentOrder', this.currentOrder);
    }

    submitOrder(): Promise<void> {
        // In a real app, this would make an API call
        return new Promise((resolve) => {
            setTimeout(() => {
                this.currentOrder.status = 'confirmed';
                this.notifyPropertyChange('currentOrder', this.currentOrder);
                resolve();
            }, 1000);
        });
    }
}