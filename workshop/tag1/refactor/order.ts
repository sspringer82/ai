interface Order {
  id: string;
  status: 'NEW' | 'PROCESSING' | 'COMPLETED' | string;
  customer: {
    address: {
      city: string;
    };
  };
}

class OrderProcessor {
  private static readonly MAX_ORDERS = 100;
  orders: Order[] = [];

  addOrder(order: Order) {
    this.orders.push(order);
    this.log(`Order added: ${order.id}`);
    if (this.orders.length > OrderProcessor.MAX_ORDERS) {
      this.log('Too many orders');
    }
  }

  processOrders() {
    this.orders.forEach((order) => {
      this.log(`Processing order: ${order.id}`);
      this.log(this.getOrderStatusMessage(order.status));
      if (order.customer.address.city === 'Berlin') {
        this.log('Customer is from Berlin');
      }
    });
  }

  generateReport() {
    let report = 'Order Report\n';
    report += '=============\n';

    this.orders.forEach((order, index) => {
      report += `Order ${index + 1}: ${order.id}\n`;
      if (order.customer.address.city === 'Berlin') {
        report += 'Customer is from Berlin\n';
      }
    });

    if (this.orders.length > OrderProcessor.MAX_ORDERS) {
      report += 'Warning: Too many orders\n';
    }

    this.log(report);
  }

  private getOrderStatusMessage(status: string): string {
    switch (status) {
      case 'NEW':
        return 'Order is new';
      case 'PROCESSING':
        return 'Order is being processed';
      case 'COMPLETED':
        return 'Order is completed';
      default:
        return 'Unknown order status';
    }
  }

  private log(message: string) {
    console.log(message);
  }
}
