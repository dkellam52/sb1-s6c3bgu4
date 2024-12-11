import { Observable } from '@nativescript/core';
import { MenuItem } from '../models/menu-item.model';

export class MenuService extends Observable {
  private menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, and basil',
      price: 12.99,
      category: 'Pizza',
      imageUrl: 'https://example.com/pizza.jpg'
    },
    {
      id: '2',
      name: 'Classic Burger',
      description: 'Beef patty with lettuce, tomato, and cheese',
      price: 9.99,
      category: 'Burgers',
      imageUrl: 'https://example.com/burger.jpg'
    }
  ];

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  getMenuItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }
}