import { Injectable } from '@angular/core';
import { BehaviorSubject, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basketCount = new BehaviorSubject<number>(this.getBasketFromLocalStorage());

  currentBasketCount = this.basketCount.asObservable();

  updateBasketCount(count: number) {
    this.basketCount.next(count);
    this.setBasketToLocalStorage(count)
  }

  private getBasketFromLocalStorage(): number {
    const count = localStorage.getItem('badgeCount');
    return count ? parseInt(count, 10) : 0;
  }

  private setBasketToLocalStorage(count: number): void {
    localStorage.setItem('badgeCount', count.toString());
  }
}
