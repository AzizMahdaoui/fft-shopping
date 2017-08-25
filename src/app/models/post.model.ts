export class Post {
  id: number;
  title: String;
  body: String;
  userId: number;

  public updatePostsFrom(src: Post): void {
    this.title = src.title;
    this.body = src.body;
  }
} 