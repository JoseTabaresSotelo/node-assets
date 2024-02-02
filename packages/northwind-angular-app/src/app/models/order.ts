export default interface Order {
  orderId: number;
  customerId: string;
  employeeId: number;
  orderDate: string;
  requiredDate: string;
  shippedDate: string;
  shipVia: number;
  freight: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipRegion: string;
  shipPostalCode: string;
  shipCountry: string;
}
