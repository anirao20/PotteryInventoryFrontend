import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { HttpErrorResponse } from '@angular/common/http';

interface Column {
  field: string;
  header: string;
}

interface Item {
  Color: string;
  Type: string;
  Price: string;
  Description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  rData?: any;
  iData?: any;
  cols!: Column[];
  item!: Item;
  selectedValue!: string;
  constructor(private dataService: DataService) { }
  onQuerySubmit(ItemID: string, Color: string, Type: string, Price: string, Description: string) {
    if (this.selectedValue === 'Item_ID') {
      this.dataService.getData(ItemID, this.selectedValue).subscribe(response => {
        this.rData = response;
      });
    }
    else if (this.selectedValue === 'Color') {
      this.dataService.getData(Color, this.selectedValue).subscribe(response => {
        this.rData = response;
      });
    }
    else if (this.selectedValue === 'Type') {
      this.dataService.getData(Type, this.selectedValue).subscribe(response => {
        this.rData = response;
      });
    }
    else if (this.selectedValue === 'Price') {
      this.dataService.getData(Price, this.selectedValue).subscribe(response => {
        this.rData = response;
      });
    }
    else {
      this.dataService.getData(Description, this.selectedValue).subscribe(response => {
        this.rData = response;
      });
    }
    this.cols = [
      { field: 'Item_ID', header: 'Item ID'},
      { field: 'Color', header: 'Color'},
      { field: 'Type', header: 'Type'},
      { field: 'Price', header: 'Price'},
      { field: 'Sell_Status', header: 'Sell Status'},
      { field: 'Sell_Date', header: 'Sell Date'},
      { field: 'Description', header: 'Description'}
    ];
  }
  createNewItem(color: string, type: string, price: string, description: string) {
    this.item = {Color: color, Type: type, Price: price, Description: description};
    this.dataService.createEntry(JSON.stringify(this.item)).subscribe(response => {
      this.iData = response;
    });
    this.cols = [
      { field: 'Item_ID', header: 'Item ID'},
      { field: 'Color', header: 'Color'},
      { field: 'Type', header: 'Type'},
      { field: 'Price', header: 'Price'},
      { field: 'Sell_Status', header: 'Sell Status'},
      { field: 'Sell_Date', header: 'Sell Date'},
      { field: 'Description', header: 'Description'}
    ]
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
  }
}
