import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {UserInterface} from '../../../types/auth.interface';
import {Router} from '@angular/router';
import {RedirectService} from '../../../services/redirect/redirect.service';
import {UserService} from '../../../services/user/user.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  protected readonly Math = Math;
  @Input() videoUrl!: string;
  @Input() slug!: string;
  @ViewChild('videoElement', {static: false}) videoElementRef!: ElementRef<HTMLVideoElement>;
  user: UserInterface | null = null
  destroy$: Subject<boolean> = new Subject();

  isPlaying = false;
  currentTime = 0;
  videoTime = 0;
  progress = 0;

  constructor(
    private userService: UserService,
    private redirectService: RedirectService,
    private router: Router,
  ) {
  }

  ngAfterViewInit(): void {
    if (this.videoElementRef && this.videoElementRef.nativeElement) {
      this.videoElementRef.nativeElement.addEventListener('canplaythrough', () => {
        if (!isNaN(this.videoElementRef.nativeElement.duration)) {
          this.videoTime = this.videoElementRef.nativeElement.duration;
        }
      });
    }
  }


  ngOnInit(): void {
    this.getUser()
    if (this.videoElementRef) {
      this.setVideoElement(this.videoElementRef);
    }
  }

  getUser() {
    this.user = this.userService.user$.getValue()
  }

  setVideoElement(videoElementRef: ElementRef<HTMLVideoElement>) {
    this.videoElementRef = videoElementRef;
    const videoElement = this.videoElementRef.nativeElement;
    videoElement.addEventListener('timeupdate', () => this.updateProgress());
  }

  toggleVideo() {
    if (this.videoElementRef) {
      const videoElement = this.videoElementRef.nativeElement;

      if (!this.isPlaying) {
        videoElement.play();
        this.isPlaying = true;
      } else {
        videoElement.pause();
        this.isPlaying = false;
      }
    }
  }

  forward() {
    if (this.videoElementRef) {
      const videoElement = this.videoElementRef.nativeElement;
      videoElement.currentTime += 15;
    }
  }

  revert() {
    if (this.videoElementRef) {
      const videoElement = this.videoElementRef.nativeElement;
      videoElement.currentTime -= 15;
    }
  }

  fullScreen() {
    if (this.videoElementRef) {
      const videoElement = this.videoElementRef.nativeElement;

      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      }
    }
  }

  updateProgress() {
    if (this.videoElementRef) {
      const videoElement = this.videoElementRef.nativeElement;

      this.currentTime = videoElement.currentTime;
      this.progress = (this.currentTime / this.videoTime) * 100;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        this.forward();
        break;
      case 'ArrowLeft':
        this.revert();
        break;
      case ' ':
        event.preventDefault();
        this.toggleVideo();
        break;
      case 'f':
        this.fullScreen();
        break;
      default:
        return;
    }
  }

  onRedirect(slug: string) {
    this.redirectService.setRedirectUrl(`/movie/${slug}`);
    this.router.navigate(['/login']);
  }
}
