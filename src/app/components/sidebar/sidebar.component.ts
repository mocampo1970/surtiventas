import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  // Inyectamos  configService y el AuthService para autenticacion
  constructor(public configService: ConfigService) { }

  ngOnInit(): void {
    //Toggle Click Function
    $('#sidebarCollapse').on('click', function() {
    $('#sidebar, #content').toggleClass('active');
});    
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }  



}
