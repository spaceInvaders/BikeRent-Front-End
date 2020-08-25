import { Component } from '@angular/core';

class Bicycle {
    bicycleName: string;
    bikeType: string;
    price: number;

    constructor(bicycleName: string, biceType: string, price: number) {

        this.bicycleName = bicycleName;
        this.bikeType = biceType;
        this.price = price;
    }
}

@Component({
    selector: 'BikeRent-Front-End',
    template: `<div class="page">
                     <h1 style="font-weight: bold;"> Awesome Bike Rental </h1>
               </div>
    <div class="panel">

        <div class="form-inline">
            <h4 style="font-weight: bold;"> &#129297; Create new rent </h4>
            <div class="form-group">
                <div class="col-md-4">
                    <input class="form-control" [(ngModel)]="name" placeholder = "Name" />
                </div>
            </div>


            <div class="form-group">
                <div class="col-md-4">
                    <input class="form-control" list="typesOfbikes" [(ngModel)]="type" placeholder="Custom" />
                    <datalist id="typesOfbikes">
                        <option value="Racing">
                        <option value="Mountain">
                    </datalist>
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-4">
                    <input type="number" class="form-control" [(ngModel)]="price" min="0.0" max="100" step="0.5" />
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-2">
                    <button class="btn btn-success" (click)="addItem(name, type, price)">Submit rent</button>
                </div>
            </div>
        </div>

        <h4 style="font-weight: bold;"> &#129321; Your rent (Total: {{calculateTotalSum() | currency}}) </h4>
        <table class="table table-striped">
            <tbody>
                <tr *ngFor="let item of itemsAreRenting">
                    <td>{{item.bicycleName}} &#47; {{item.bikeType}} &#47; {{item.price | currency}}</td>
                    <td><button class="btn btn-danger btn-sm btn-block" (click)="cuncelRent(item)">Cancel rent</button></td>
                </tr>
            </tbody>
        </table>
        
        <h4 style="font-weight: bold;"> &#x1f6b2; Available bicycles ({{itemsForRent.length}}) </h4>
        <table class="table table-striped">
            <tbody>
                <tr *ngFor="let item of itemsForRent">
                    <td>{{item.bicycleName}} &#47; {{item.bikeType}} &#47; {{item.price | currency}}</td>
                    <td><button class="btn btn-primary btn-sm btn-block" (click)="rentItem(item)">Rent</button></td>
                    <td><button class="btn btn-danger btn-sm btn-block" (click)="deleteItem(item)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>`
})
export class AppComponent {
    name: string;
    type: string;
    price: number = 12;

    itemsForRent: Bicycle[] =
        [
            { bicycleName: "SuperFast bicycle", bikeType: "Racing", price: 12.99 },
            { bicycleName: "Awesome bicycle", bikeType: "Racing", price: 17.99 },
            { bicycleName: "ThunderStorm bicycle", bikeType: "Mountain", price: 28.99 }
        ];

    itemsAreRenting: Bicycle[] =
        [
            { bicycleName: "SuperFast bicycle", bikeType: "Custom", price: 12.99 }
        ];

    calculateTotalSum(): string {
        let totalSum: number = 0;
        for (let index = 0; index < this.itemsAreRenting.length; index++) {
            totalSum += this.itemsAreRenting[index].price;
        }
        return totalSum.toPrecision(4);
    }

    addItem(name: string, type: string, price: number): void {
        if (name == null || name.trim() == "" || price == null)
            return;
        this.itemsForRent.push(new Bicycle(name + " bicycle", type, price));
    }

    deleteItem(item: Bicycle): void {

        for (let index = 0; index < this.itemsForRent.length; index++) {
            if (item.bicycleName == this.itemsForRent[index].bicycleName
                && item.bikeType == this.itemsForRent[index].bikeType
                && item.price == this.itemsForRent[index].price) {
                this.itemsForRent.splice(index, 1);
                break;
            }
        }
    }

    rentItem(item: Bicycle): void {
        for (let index = 0; index < this.itemsForRent.length; index++) {
            if (item.bicycleName == this.itemsForRent[index].bicycleName
                && item.bikeType == this.itemsForRent[index].bikeType
                && item.price == this.itemsForRent[index].price) {
                let itemIsRenting: Bicycle[] = this.itemsForRent.splice(index, 1);
                this.itemsAreRenting.push(itemIsRenting[0]);
                break;
            }
        }
    }

    cuncelRent(item: Bicycle): void {
        for (let index = 0; index < this.itemsAreRenting.length; index++) {
            if (item.bicycleName == this.itemsAreRenting[index].bicycleName
                && item.bikeType == this.itemsAreRenting[index].bikeType
                && item.price == this.itemsAreRenting[index].price) {
                let itemIsFreeForRent: Bicycle[] = this.itemsAreRenting.splice(index, 1);
                this.itemsForRent.push(itemIsFreeForRent[0]);
                break;
            }
        }
    }
}