import { Component, OnInit } from '@angular/core';
import { Bicycle } from './bicycle';
import { BicycleService } from './bicycle.service';

@Component({
    selector: 'BikeRent',
    templateUrl: `./app.component.html`,
    providers: [BicycleService]
})
export class AppComponent implements OnInit
{
    name: string;
    type: string;
    price: number = 12;
    bikesForRent: Array<Bicycle>;
    bikesAreRenting: Array<Bicycle>;

    constructor(private service: BicycleService)
    {
        this.bikesForRent = new Array<Bicycle>();
        this.bikesAreRenting = new Array<Bicycle>();
    }

    ngOnInit(): void
    {
        this.loadBicycles("free");
        this.loadBicycles("isRenting");
    }

    private loadBicycles(status: string)
    {
        this.service
            .getBicycles(status)
            .subscribe(
                (responceFromServer: Bicycle[]) =>
                {
                    if (status == "free") { this.bikesForRent = responceFromServer; }
                    else if (status == "isRenting") { this.bikesAreRenting = responceFromServer; }
                    else (console.log("loadBicycles: wrong status"))
                });
    }

    createBike(name: string, type: string, price: number)
    {
        if (name == null || name.trim() == "" || price == null || type == null)
            return; 

        let newBike: Bicycle = new Bicycle(name, type, price, "free");

        this.service
            .saveBikeToDb(newBike)
            .subscribe(
                (bikeFromServer: Bicycle) =>
                {
                    this.bikesForRent.push(bikeFromServer);
                });
    }

    changeStatus(bike: Bicycle, changeToStatus: string)
    {
        let editedBike: Bicycle = bike;
        editedBike.status = changeToStatus;

        this.service
            .updateBike(editedBike)
            .subscribe(
                (bikeFromServer: Bicycle) =>
                {
                    this.updateStatus(bikeFromServer);
                });
    }

    private updateStatus(bikeFromServer: Bicycle)
    {
        let arrayMoveFrom: Bicycle[];
        let arrayMoveTo: Bicycle[];

        if (bikeFromServer.status == "isRenting")
        {
            arrayMoveFrom = this.bikesForRent;
            arrayMoveTo = this.bikesAreRenting;
        }
        else if (bikeFromServer.status == "free")
        {
            arrayMoveFrom = this.bikesAreRenting;
            arrayMoveTo = this.bikesForRent;
        }
        else { return; }

        for (let index = 0; index < arrayMoveFrom.length; index++)
        {
            if (arrayMoveFrom[index].id == bikeFromServer.id)
            {
                let bikeToMove: Bicycle = (arrayMoveFrom.splice(index, 1))[0];
                arrayMoveTo.push(bikeToMove);
            }
        }
    }

    calculateTotalSum(): string
    {
        let totalSum: number = 0;
        for (let index = 0; index < this.bikesAreRenting.length; index++) {
            totalSum += this.bikesAreRenting[index].price;
        }
        return totalSum.toPrecision(4);
    }
}