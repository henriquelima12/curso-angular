import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress: number = 0;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);
    /*var selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('formFile').innerHTML = fileNames.join(', ');*/

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(
          response => console.log('Upload concluído!')
        );
      /*.subscribe(
        (event: HttpEvent<Object>) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload concluído!');
          } else if (event.type === HttpEventType.UploadProgress) {
            var percent = Math.round((event.loaded * 100) / event.total);
            //console.log('Progresso: ', percent);
            this.progress = percent;
          }
        }
      );*/
    }
  }

  onDownloadExcel() {
    this.uploadFileService.download(`${environment.BASE_URL}/downloadExcel`)
      .subscribe(
        (response: any) => {
          this.uploadFileService.handleFile(response, 'report.xlsx');
        }
      );
  }

  onDownloadPDF() {
    this.uploadFileService.download(`${environment.BASE_URL}/downloadPDF`)
      .subscribe(
        (response: any) => {
          this.uploadFileService.handleFile(response, 'report.pdf');
        }
      );
  }

}
