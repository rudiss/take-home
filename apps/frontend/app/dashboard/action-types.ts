/** Shared server-action return shape for dashboard forms (create/update/delete). */
export interface DashboardActionState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}
