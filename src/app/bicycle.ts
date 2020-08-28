export class Bicycle
{
    public id: number;
    public bicycleName: string;
    public bikeType: string;
    public price: number;
    public status: string;

    constructor(bicycleName: string, bikeType: string, price: number, status: string)
    {
        this.bicycleName = bicycleName;
        this.bikeType = bikeType;
        this.price = price;
        this.status = status;
    }
}