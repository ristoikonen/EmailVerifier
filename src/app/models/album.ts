export interface IAlbum {
    userId: string;
    title: string;
    id: Number;
}

export class Album implements IAlbum
{
    userId!: string;
    title!: string;
    id!: Number;
    
    constructor()
    {
        this.userId = '';
        this.title = '';
        this.id = 0;
    }  

}
