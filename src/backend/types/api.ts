export interface ApiMeta {
  network: string;
  pool: string;
  defaultNetwork: boolean;
  defaultPool: boolean;
  [k: string]: unknown;
}

export interface PriceResponse {
  price: string | "N/A";
  meta: ApiMeta;
}

export interface StatsResponse {
  marketCapUsd: number | null;
  fdvUsd: number | null;
  lockedLiquidityPercentage: number | null;
  holders: number | null;
  tradingVolumeUsdPeriod: number;
  periodHours: number;
  tradesConsidered: number;
  limitRequested: number;
  sources: Record<string, string>;
  meta: ApiMeta;
}

export interface TradeAttributes {
  block_number?: string;
  block_timestamp?: string;
  tx_hash?: string;
  tx_from_address?: string;
  from_token_amount?: string;
  to_token_amount?: string;
  price_from_in_currency_token?: string;
  price_to_in_currency_token?: string;
  price_from_in_usd?: string;
  price_to_in_usd?: string;
  kind?: string;
  volume_in_usd?: string;
  from_token_address?: string;
  to_token_address?: string;
}

export interface Trade {
  id: string;
  type: string;
  attributes: TradeAttributes;
}

export interface TradesResponse {
  trades: Trade[];
  aggregatedVolumeUsd: number;
  meta: ApiMeta;
}

export interface PriceTick {
  price: number;
  timestamp: number;
}

export interface PriceTicksResponse {
  ticks: PriceTick[];
  meta: ApiMeta;
}

export interface ChartResponse {
  series: { prices: [number, number][] };
  network: string;
  pool: string;
  timeframe: string;
  meta: ApiMeta;
}
