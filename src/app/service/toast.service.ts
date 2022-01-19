import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts:any[] = []

  constructor() { }

  show(header: string, body: string) {
    const sentToast = this.toasts.push({header, body});
    // this.remove(sentToast);
    }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
    setTimeout( () => {
      this.delete()
    }
    , 20000);
  }

  delete() {
    this.toasts = [];
  }

}
