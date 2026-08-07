import { NextRequest } from "next/server";

/**
 * Minimal shared-access-code gate for the admin API. This is a starting
 * point, not a full auth system: for production hospital deployment, swap
 * this for Supabase Auth with role-based access control (pharmacist/admin
 * role) and audit logging of who changed what.
 */
export function isAdminAuthorized(req: NextRequest): boolean {
  const configured = process.env.ADMIN_ACCESS_CODE;
  if (!configured) return false;
  const header = req.headers.get("x-admin-code");
  return header === configured;
}
