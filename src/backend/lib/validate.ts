import { Request } from "express";

export function pickNumber(
  req: Request,
  name: string,
  def: number,
  { min, max }: { min?: number; max?: number } = {}
) {
  let v = req.query[name];
  if (Array.isArray(v)) v = v[0];
  const num = Number(v ?? def);
  let out = Number.isFinite(num) ? num : def;
  if (min !== undefined) out = Math.max(min, out);
  if (max !== undefined) out = Math.min(max, out);
  return out;
}

export function pickString(req: Request, name: string, def: string) {
  let v = req.query[name];
  if (Array.isArray(v)) v = v[0];
  return (v ?? def).toString();
}
