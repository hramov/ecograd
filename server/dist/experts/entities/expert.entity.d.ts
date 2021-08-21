import { Model } from "sequelize";
interface ExpertCreationAttrs {
    position: string;
    cert: string;
    direction: string;
    misc: string;
}
export declare class Expert extends Model<Expert, ExpertCreationAttrs> {
    id: number;
    position: string;
    cert: string;
    direction: string;
    misc: string;
}
export {};
