export class Slider {
    private id: string;
    private title: string;
    private url: string;
    private image: string;

    getId(): string {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getUrl(): string {
        return this.url;
    }

    getImage(): string {
        return this.image;
    }

    static Create(data: {
        title: string;
        url: string;
        image: string;
    }) {
        // Validate data

        return data;
    }
}