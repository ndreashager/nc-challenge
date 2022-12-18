import { Component, OnInit } from '@angular/core'
import { Router, RoutesRecognized } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../demo-styling.css'],
})
export class AppComponent {
  title = ''
  constructor(private router: Router) {
    // listen to page variable from router events
    router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild
        this.title = route?.data['title'] || ''
      }
    })
  }
}
