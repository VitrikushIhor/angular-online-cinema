import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent {
  @Input() isSmashed: boolean = false
  @Output() buttonClick: EventEmitter<any> = new EventEmitter()
}
