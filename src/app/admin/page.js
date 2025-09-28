"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

// Force dynamic rendering to prevent build-time Firebase initialization
export const dynamic = 'force-dynamic';

export default function AdminIndex() {
  // Remover redirecionamento automático
  return null;
}
