import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../orders.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ordersList = [];
  deletedata:any;

  adeditType = 'ADD ORDER';
  orderForm: any;
  submitButton = false;

  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private ordersService: OrdersService, private modalService: NgbModal, private router: Router) {
      this.orderForm = new FormGroup({
        orderno: new FormControl(null, Validators.compose([])),
        duedate: new FormControl(null, Validators.compose([Validators.required])),
        buyername: new FormControl(null, Validators.compose([Validators.required])),
        address: new FormControl(null, Validators.compose([Validators.required, ])),
        phone: new FormControl(null, Validators.compose([Validators.required])),
        cost: new FormControl(null, Validators.compose([Validators.required]))
    });

   }

  ngOnInit() {
    this.ordersService.getOrders()
          .subscribe(res=>{
            if(res.length> 0)
              this.ordersList = res;

          })
  }

  viewdueDate(date){
    if(date)
      return date.year+'-'+date.month+'-'+date.day;
    else return 'No Date';
  }


  saveOrder(){
    this.submitButton = true;
    if(this.orderForm.valid){
      if(this.orderForm.value.orderno){
        this.updateOrder();
      }else{
        let orderNo = this.ordersList[this.ordersList.length-1].orderno + 11;
        this.orderForm.controls.orderno.setValue(orderNo);
        this.ordersList.push(this.orderForm.value);
        this.modalService.dismissAll();
        this.clear();
      }
    }
  }

  addOrder(content){
    this.clear();
    this.modalService.open(content, { size: 'lg' });
  }

  editOrder(data, content){
    this.adeditType = 'EDIT ORDER';
    this.orderForm.controls.orderno.setValue(data.orderno);
    this.orderForm.controls.buyername.setValue(data.buyername);
    this.orderForm.controls.duedate.setValue(data.duedate);
    this.orderForm.controls.address.setValue(data.address);
    this.orderForm.controls.phone.setValue(data.phone);
    this.orderForm.controls.cost.setValue(data.cost);
    this.modalService.open(content, { size: 'lg' });
  }

  updateOrder(){
    let ind = this.ordersList.findIndex(item=> item.orderno == this.orderForm.value.orderno);
    this.ordersList[ind] = this.orderForm.value;
    this.modalService.dismissAll();
    this.clear();
  }

  deleteOrder(data, content){
    this.deletedata = data;
    this.modalService.open(content, { size: 'lg' });
  }

  deleteOrderData(){
    this.ordersList = this.ordersList.filter(item =>{ return item.orderno != this.deletedata.orderno});
  }

  clear(){
    this.adeditType = 'ADD ORDER';
    this.deletedata = null;
    this.orderForm.reset();
    this.submitButton = false;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
