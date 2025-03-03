import { User } from "./user";

export class UserInformation {
    page!: Number;
    per_page!: Number;
    total!: Number;
    total_pages!: Number;
    data!: User[];
}
