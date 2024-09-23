import { Component, OnInit } from '@angular/core';
import { BangGiaApiService } from 'src/app/services/api/bang-gia.services';

@Component({
  selector: 'app-bang-gia',
  templateUrl: './bang-gia.component.html',
  styleUrls: ['./bang-gia.component.scss']
})
export class BangGiaComponent implements OnInit {
  prices: any[] = [];

  constructor(private bangGiaApiService: BangGiaApiService) {}

  ngOnInit(): void {
    this.loadBangGia();
  }

  loadBangGia(): void {
    this.bangGiaApiService.getbangGia().subscribe(
      (data) => {
        this.prices = data;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
