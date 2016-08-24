import { IOutputProvider } from "./output-provider.i";
import { ResultType } from "../result-type";

export class OutputProvider implements IOutputProvider {
    public getResultMessage(type: ResultType, typeCount: number, totalCount: number): string {
        return undefined;
    }

    public getTestFixtureMessage(name: string): string {
        return undefined;
    }

    public getTestNameMessage(name: string): string {
        return undefined;
    }
}
