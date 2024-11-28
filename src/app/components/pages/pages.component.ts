import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuranApiServiceService } from '../../services/quran-api-service.service';
//import { ApiResponse } from '../../models/interfaces/ayah';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {
  //ayahs: ApiResponse[] =[];
  ayahs: any[] = [];

  surahNumbers: number = 1;
  ayahNumber: number = 1;
  totalAyahs: number = 1;
  totalLastAyah: number = 0;

  quranService = inject(QuranApiServiceService);

  ngOnInit(): void {
    this.loadAyahs();
  }

  loadAyahs() {
    this.quranService.getAyah( this.surahNumbers,this.ayahNumber).subscribe((response) => {
      this.ayahs = [{
        surahName: response.data.surah.englishName,
        surahNameArabic: response.data.surah.name,
        arabic2: response.data.text
        // surahName: response.surahName,
        // surahNameArabic: response.surahNameArabic,
        // english: response.english,
        // arabic1: response.arabic1,
        // arabic2: response.arabic2
      }];
      //this.totalAyahs = response.totalAyah;
      this.totalAyahs = response.data.surah.numberOfAyahs;
    });
  }

  search() {
    this.resetAyahs();
    this.loadAyahs();
  }

  resetAyahs() {
    this.ayahs = [];
    this.ayahNumber = this.ayahNumber;
  }

  searchPrev() {
    if (this.ayahNumber > 1) {
      this.loadPrevAyah();
    } else {
      this.surahNumbers != 1 ? this.surahNumbers-- : this.surahNumbers = 1;
      this.ayahNumber = this.totalLastAyah;
      this.loadPrevAyah();
    }
  }

  searchNext() {
    if (this.ayahNumber < this.totalAyahs) {
      this.loadNextAyah();
    }
    else if (this.surahNumbers < 114) {
      this.surahNumbers++;
      this.ayahNumber = 0;
      //this.ayahNumber = 1;
      this.loadNextAyah();
      this.totalLastAyah = this.totalAyahs + 1;
    }
    else {
      console.log('Already at the last Ayah. No next Ayah to load.');
    }
  }
  loadNextAyah() {
    if (this.ayahNumber < this.totalAyahs) {
      this.ayahNumber++; // Increment to load the next Ayah
      this.loadAyahs(); // Fetch and load the next Ayah
      console.log(`loadnext ayah${this.ayahNumber}`);
      console.log(`loadnext surah${this.surahNumbers}`);
    } else {
      console.log('No more Ayahs to load.');
    }
  }

  loadPrevAyah() {
    if (this.ayahNumber > 1) {
      this.ayahNumber--; // Decrement to load the previous Ayah
      this.loadAyahs(); // Fetch and load the previous Ayah
    } else {
      console.log('No more previous Ayahs to load.');
    }
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.searchNext();
    } else if (event.key === 'ArrowLeft') {
      this.searchPrev();
    }
  }


}
