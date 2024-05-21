export interface CrossCalculationsState {
  calculation: ICrossCalculationsResult;
  orders: ICrossOrders;
}

export interface CrossSelector {
  crossCalculationsSelector: (state: Store) => ICrossCalculationsResult;
  crossOrdersSelector: (state: Store) => ICrossOrders;
}

export interface ICrossCalculationsResult {
  hash?: string;
  status: string;
  products: MainProperties[];
  propositions: ICrossCalculationsProposition[];
}

export interface ICrossCalculationsProposition {
  hash: string;
  price: number;
  limits: Array<{
    title: string;
    limit: number;
  }>;
  companyId: number;
  companyName: string;
  icon: string;
  type: string;
  insuranceEntity: string;
  startDate: string;
  product: Products;
}

interface MainProperties {
  id: string;
  name: string;
  description: string;
}

interface ProductProperties extends MainProperties {
  number: number;
  icon: string;
}

interface Risks extends MainProperties {
  number: number;
  icon: string;
}

interface Actions extends MainProperties {
  number: number;
}

interface Restrictions extends MainProperties {
  number: number;
  icon: string;
}

interface Documents extends MainProperties {
  number: number;
  icon: string;
  file: string;
}

interface Products extends MainProperties {
  properties: ProductProperties[];
  recommendation: string;
  risks: Risks[];
  actions: Actions[];
  restrictions: Restrictions[];
  documents: Documents[];
}

export interface ICrossOrders {
  hash: string;
  status: 'none' | 'error' | 'created' | 'running' | 'finished';
  paymentUrl: string;
  message: string;
}
