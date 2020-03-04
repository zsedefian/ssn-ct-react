export class RedactedImage {
    phoneNumber: string;
    text: string;
    date: string;
    imageUrl: string;
    backgroundColor: string;

    constructor(phoneNumber: string, text: string, date: string, imageUrl: string, backgroundColor: string) {
        this.phoneNumber = phoneNumber;
        this.text = text;
        this.date = date;
        this.imageUrl = imageUrl;
        this.backgroundColor = backgroundColor;
    }
}
