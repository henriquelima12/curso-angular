import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rotas';

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService){
  }

  ngOnInit(){
    this.authService.showMenu.subscribe(
      res => this.mostrarMenu = res
    )
  }
}
