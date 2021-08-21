import { Model } from 'sequelize-typescript';
interface FeedbackCreationAttrs {
    name: string;
    email: string;
    feedback: string;
}
export declare class Feedback extends Model<Feedback, FeedbackCreationAttrs> {
    id: number;
    name: string;
    email: string;
    feedback: string;
}
export {};
