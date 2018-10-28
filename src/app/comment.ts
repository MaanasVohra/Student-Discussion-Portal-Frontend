export class Comment {
    commentCreator: string;
    commentContent: string;
    commentNumber: number;

    constructor(commentCreator: string, commentContent: string, commentNumber?: number) {
        this.commentCreator = commentCreator;
        this.commentContent = commentContent;
        if(commentNumber) {
            this.commentNumber = commentNumber;
        } else {
            this.commentNumber = -1;
        }
    }
}
