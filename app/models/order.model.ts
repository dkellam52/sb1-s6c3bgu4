export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  type: 'pickup' | 'delivery';
  status: 'pending' | 'confirmed' | 'ready' | 'delivered';
  address?: string;
  createdAt: Date;
}