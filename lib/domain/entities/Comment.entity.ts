export class Comment {
    private id: string;
    private content: string;

    getId(): string {
        return this.id;
    }

    getContent(): string {
        return this.content;
    }

    static Create(data: {
        content: string;
    }) {
        // Validate data

        return data;
    }
}