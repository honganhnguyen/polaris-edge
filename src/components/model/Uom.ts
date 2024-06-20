
export default interface Uom {
  id: string;
  name: string;
  symbol: string;
  description?: string | null | undefined;
  type?: string | null | undefined;
  order: number;
}
