import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

const api = axios.create({
  baseURL: API_URL,
});

export interface BrandRequest {
  id: string;
  name: string;
  email: string;
  business_type: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  email: string;
  sign_in_code: string;
  created_at: string;
}

export interface Product {
  id: string;
  brand_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  product_id: string;
  buyer_id: string;
  buyer_name: string;
  status: 'pending' | 'shipped' | 'delivered';
  created_at: string;
  updated_at: string;
}

export async function submitBrandRequest(data: any): Promise<any> {
  const response = await api.post('/api/brand-requests', data);
  return response.data;
}

export async function getBrandRequests(): Promise<BrandRequest[]> {
  const response = await api.get('/api/brand-requests');
  return response.data;
}

export async function getBrand(brandId: string): Promise<Brand | null> {
  try {
    // In a real app, this would be an API call
    return null;
  } catch (err) {
    return null;
  }
}

export async function getBrandByEmail(email: string): Promise<Brand | null> {
  // This would typically be handled by the signin API
  return null;
}

export async function createProduct(data: any): Promise<Product | null> {
  const response = await api.post('/api/products', data);
  return response.data;
}

export async function getProducts(brandId: string): Promise<Product[]> {
  const response = await api.get(`/api/products/${brandId}`);
  return response.data;
}

export async function getOrders(brandId: string): Promise<Order[]> {
  const response = await api.get(`/api/orders/${brandId}`);
  return response.data;
}
