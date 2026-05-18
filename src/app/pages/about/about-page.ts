import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPage {}
