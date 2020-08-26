import { Component, OnInit } from '@angular/core';
import { Bicycle } from './bicycle';
import { BicycleService } from './bicycle.service';

@Component({
    selector: 'BikeRent',
    templateUrl: `./app.component.html`,
    providers: [BicycleService]
})
export class AppComponent implements OnInit {

   
    name: string;
    type: string;
    price: number = 12;

    itemsForRent: Bicycle[] =
        [
            new Bicycle("SuperFast bicycle", "Racing", 12.99, "free"),
            new Bicycle("Awesome bicycle", "Racing", 17.99, "free"),
            new Bicycle("ThunderStorm bicycle", "Mountain", 28.99, "free"),
        ];

    itemsAreRenting: Bicycle[] =
        [
            new Bicycle("SuperFast bicycle", "Custom", 12.99, "isRenting")
        ];

    calculateTotalSum(): string {
        let totalSum: number = 0;
        for (let index = 0; index < this.itemsAreRenting.length; index++) {
            totalSum += this.itemsAreRenting[index].price;
        }
        return totalSum.toPrecision(4);
    }

    addItem(name: string, type: string, price: number): void {
        if (name == null || name.trim() == "" || price == null || type == null || status == null)
            return;
        this.itemsForRent.push(new Bicycle(name + " bicycle", type, price, "free"));
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