import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostService} from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isLoading = false;

  constructor(private http: HttpClient, private postService: PostService) {
  }

  ngOnInit() {
    this.onFetchPosts()
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.onCreatePost(postData).subscribe((resData) => {
      this.loadedPosts.push({...postData, id: resData})
    })
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.onGetPosts().subscribe((responseData => {
     this.loadedPosts = responseData
      this.isLoading = false;
    }))
  }

  onClearPosts() {
    // Send Http request
  }
}
