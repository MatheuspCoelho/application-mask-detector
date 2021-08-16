import { Component, Input, OnInit } from '@angular/core';
import modeloJson from '../../modelos/modelo-1.json';


@Component({
  selector: 'app-acess',
  templateUrl: './acess.component.html',
  styleUrls: ['./acess.component.css']
})


export class AcessComponent {

  public acess: boolean = false;

  @Input('setAcess') set acessValue(value: boolean) {
    this.acess = value;
  }
}
