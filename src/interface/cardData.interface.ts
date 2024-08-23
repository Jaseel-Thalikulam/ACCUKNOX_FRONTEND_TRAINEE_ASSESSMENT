import { Label } from "./label.interface";


export interface CardData {
  title: string;
  labels: Label[];
  isEnabled?:boolean
}

