import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private http: HttpClient) {
  }

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    console.log(this.selectedFile);
    const fd = new FormData();
    fd.append('file', this.selectedFile, 'test');
    console.log(fd);
    this.http.post('http://localhost:3000/upload', fd).subscribe(event => {
      console.log(event);
    });
  }
}
