import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    OrdersList = [
        {
            orderno: 101,
            duedate: {year: 2020, month: 2, day: 16},
            buyername: 'John',
            address: 'Gachibowli',
            phone: '121222323',
            cost: 2777
        },
        {
            orderno: 102,
            duedate: {year: 2020, month: 3, day: 20},
            buyername: 'Rock',
            address: 'Nanakramguda',
            phone: '656565656',
            cost: 6564
        },
        {
            orderno: 103,
            duedate: {year: 2020, month: 3, day: 11},
            buyername: 'Sachin',
            address: 'Hitech',
            phone: '12564444',
            cost: 12345
        },
        {
            orderno: 104,
            duedate: {year: 2020, month: 2, day: 20},
            buyername: 'Mounika',
            address: 'Madhapur',
            phone: '987655455',
            cost: 987
        },
        {
            orderno: 105,
            duedate: {year: 2020, month: 2, day: 24},
            buyername: 'Mark',
            address: 'Indranagar',
            phone: '4555666',
            cost: 459
        },
        {
            orderno: 106,
            duedate: {year: 2020, month: 2, day: 16},
            buyername: 'Barney',
            address: 'Gachibowli',
            phone: '24445',
            cost: 1387
        }
    ];

    public getOrders() {
        return this.defaultOrders.asObservable();
    }

    private defaultOrders: BehaviorSubject<[]> = new BehaviorSubject<any>(this.OrdersList);

    updateOrders(updatedData) {
        this.defaultOrders.next(updatedData);
    }

    constructor() {
     }



    
}
