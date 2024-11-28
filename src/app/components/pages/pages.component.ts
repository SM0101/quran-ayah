import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuranApiServiceService } from '../../services/quran-api-service.service';
import { forkJoin } from 'rxjs';
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
  arabic: any[] = [];
  english: any[] = [];

  surahNumbers: number = 1;
  ayahNumber: number = 1;
  totalAyahs: number = 1;
  totalLastAyah: number = 0;

  quranService = inject(QuranApiServiceService);

  ngOnInit(): void {
    this.loadAyahs();
  }

  loadAyahs() {
    forkJoin({
      arabic: this.quranService.getAyah(this.surahNumbers, this.ayahNumber),
      english: this.quranService.getAyahTranslation(this.surahNumbers, this.ayahNumber)
    }).subscribe({
      next: (response) => {
        this.arabic = response.arabic;
        this.english = response.english;

        this.ayahs = [{
          surahName: response.arabic.data.surah.englishName,
          surahNameArabic: response.arabic.data.surah.name,
          arabic2: response.arabic.data.text,
          sajda: response.arabic.data.sajda,
          revelationType: response.arabic.data.surah.revelationType,
          englishNameTranslation: response.arabic.data.surah.englishNameTranslation,
          english: response.english.english
        }];
        this.totalAyahs = response.arabic.data.surah.numberOfAyahs;

      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
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

@HostListener('window:wheel', ['$event'])
handleScrollEvent(event: WheelEvent) {
  // Check the scroll direction
  if (event.deltaY > 0) {
    // Scrolled down
    this.searchNext();
  } else if (event.deltaY < 0) {
    // Scrolled up
    this.searchPrev();
  }
}


}
