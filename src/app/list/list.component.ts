import { Component, OnInit } from '@angular/core';
import { Coffee } from '../../logic/Coffee';
import { DataService } from '../data.service';
import { JsonPipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ JsonPipe, MatCardModule, MatButtonModule,MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  list: Coffee[] = [];
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.getList((list: Coffee[]) => {
      this.list = list;
    });
  }
}
