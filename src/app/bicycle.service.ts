import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bicycle } from './bicycle';

@Injectable()
export class BicycleService
{
    private url = "https://localhost:44368/api/bicycles";
    constructor(private http: HttpClient)
    { }

    // READ
    getBicycles(status: string)
    {
        const free: string = "free";
        const isRenting: string = "isRenting";

        if (status == free)
        {
            return this.http.get(this.url + "/" + free);
        }
        else if (status == isRenting)
        {
            return this.http.get(this.url + "/" + isRenting);
        }
        else { return; }
    }

    // CREATE
    saveBikeToDb(bike: Bicycle)
    {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(this.url, JSON.stringify(bike), { headers: myHeaders });
    }

    // UPDATE
    updateBike(bike: Bicycle)
    {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(this.url, JSON.stringify(bike), { headers: myHeaders });
    }

    // DELETE
    deleteBike(id: number)
    {
        return this.http.delete(this.url + "/" + id);
    }
}