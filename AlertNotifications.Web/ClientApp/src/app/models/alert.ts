export interface Alert {
  id: number;
  message: string;
  trigger: Date;
  sent: boolean;
}
