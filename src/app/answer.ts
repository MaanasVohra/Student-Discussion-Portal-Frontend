export class Answer {
    answerCreator: string;
    answerContent: string;
    answerNumber: number;

    // this handles an exception case for the implemented functionality of adding answer
    constructor(answerCreator: string, answerContent: string, answerNumber?: number) {
        this.answerCreator = answerCreator;
        this.answerContent = answerContent;
        if(answerNumber) {
            this.answerNumber = answerNumber;
        } else {
            this.answerNumber = -1;
        }
    }
}
