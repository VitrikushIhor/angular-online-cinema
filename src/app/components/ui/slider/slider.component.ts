import {Component, Input} from '@angular/core';
import {InterfaceSlides} from '../../../types/home.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @Input() slides: InterfaceSlides[] = []

  currentIndex: number = 0;
  timeoutId?: number;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.resetTimer();
  }

  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }

  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 10000);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }
  isSlideActive(index: number): boolean {
    return index === this.currentIndex;
  }

  getDotClass(index: number): string {
    return this.isSlideActive(index) ? 'active-dot' : '';
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex]?.bigPoster}')`;
  }
  getCurrentSlideTitle() {
    return `${this.slides[this.currentIndex].title}`;
  }
  getCurrentSlideSubtitle() {
    return `${this.slides[this.currentIndex].subTitle}`;
  }
  onClick(){
    return this.router.navigate([this.slides[this.currentIndex].link])
  }
}
