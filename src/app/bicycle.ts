export class Bicycle
{
    public id: number;
    public bicycleName: string;
    public bikeType: string;
    public price: number;
    public status: string;
    private static counter: number = 0;

    constructor(bicycleName: string, bikeType: string, price: number, status: string)
    {
        this.id = ++Bicycle.counter;
        this.bicycleName = bicycleName;
        this.bikeType = bikeType;
        this.price = price;
        this.status = status;
    }
}