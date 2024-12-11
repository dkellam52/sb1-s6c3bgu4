import { Observable, Frame } from '@nativescript/core';
import { MenuService } from '../../services/menu.service';
import { OrderService } from '../../services/order.service';
import { MenuItem } from '../../models/menu-item.model';

export class MenuViewModel extends Observable {
    private menuService: MenuService;
    private orderService: OrderService;
    private _menuItems: MenuItem[];
    private _searchQuery: string = '';

    constructor() {
        super();
        this.menuService = new MenuService();
        this.orderService = new OrderService();
        this._menuItems = this.menuService.getMenuItems();
    }

    get menuItems(): MenuItem[] {
        return this._menuItems;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.filterMenuItems();
        }
    }

    private filterMenuItems() {
        const query = this._searchQuery.toLowerCase();
        this._menuItems = this.menuService.getMenuItems().filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
        this.notifyPropertyChange('menuItems', this._menuItems);
    }

    onAddToCart(args: EventData) {
        const button = args.object as any;
        const menuItem = button.bindingContext as MenuItem;
        
        this.orderService.addToOrder({
            menuItem,
            quantity: 1
        });
    }

    goToCart() {
        Frame.topmost().navigate('components/cart/cart-page');
    }
}