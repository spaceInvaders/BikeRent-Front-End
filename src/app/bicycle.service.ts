import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bicycle } from './bicycle';

@Injectable()
export class BicycleService
{
    private url = "http://localhost:63333/api/bicycles";
    constructor(private http: HttpClient)
    { }

    getBicycles() {
        return this.http.get(this.url);
    }

    createBicycle(bicycle: Bicycle)
    {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(this.url, JSON.stringify(bicycle), { headers: myHeaders });
    }

    updateBicycle(id: number, bicycle: Bicycle)
    {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(this.url, JSON.stringify(bicycle), { headers: myHeaders });
    }

    deleteBicycle(id: number)
    {
        return this.http.delete(this.url + '/' + id);
    }
}