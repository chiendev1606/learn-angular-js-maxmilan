import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from './post.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL= 'https://learn-angular-js-2cd9f-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient) {
  }

  onCreatePost(postData: { title: string; content: string }) {
    return this.http.post<Post>(this.URL, postData, {
    headers: new HttpHeaders({'custom-header': 'happy'}),
      params: new HttpParams().set('chien', 'quoc'),
      observe: 'events'
    }
  )

  onGetPosts() {
    return this.http.get<Post[]>(this.URL).pipe(map((res) => {
      const posts: Post[] = [];

      for (const key in res) {
        if (key in res)
          posts.push({...res[key], id: key});
      }

      return posts;

    }))
  }



}
