import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "app/models/product.model";
import {Post} from "app/models/Post.model";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { CachcingServiceBase } from "./caching.service";

let count = 0;

@Injectable()
export class ProductsDataService extends CachcingServiceBase {
  private products: Observable<Product[]>;
  private posts : Observable<Post[]>;

  public constructor(private http: Http) {
    super();
  }

  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.http
                                           .get("./assets/products.json")
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Product();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      })));

  }

  public allPostsFromWS(): Observable<Post[]> {
    return this.cache<Post[]>(() => this.posts,
                                 (val: Observable<Post[]>) => this.posts = val,
                                 () => this.http
                                           .get("https://jsonplaceholder.typicode.com/posts")
                                           .map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Post();
                                                                        model.updnpm atePostsFrom(item);
                                                                        return model;
                                                                      })));

  }

}
