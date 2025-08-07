export interface ActionData<T> extends ActionResult {
  data: T;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  data?: any;
}
