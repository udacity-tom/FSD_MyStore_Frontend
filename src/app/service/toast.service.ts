import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  toast: any;
  toasts: any[] = [];

  constructor() { }

  show(header: string, body: string): void {
    const delay = 12000;
    const sentToast = this.toasts.push({header, body, delay});
    setTimeout( () => {
      this.remove(sentToast);
    }, delay + 15000);
    }

  remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
    setTimeout( () => {
      this.delete(toast);
    }
    , 25000);
  }

  delete(toast: any): void {
    const index = this.toasts.indexOf(toast);
    this.toasts.splice(index, 1);
  }

}
