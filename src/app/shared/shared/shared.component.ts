import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Viajes } from '../../usuario.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent implements OnInit{

  

  constructor(private sharedService:SharedService){}

  viaje:Viajes|null=null;

  ngOnInit(): void {
    this.viaje = this.sharedService.getViaje();
  }

}
