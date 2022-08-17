import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-open-sessions',
  templateUrl: './open-sessions.component.html'
})
export class OpenSessionsComponent implements OnInit {
  title = 'sample-app';
  sessions: any[] = [];

  constructor(private apollo: Apollo) {
    apollo.subscribe({
      query: gql`
        subscription openSessions {
          game_session(order_by: {created_at: asc}, where: {status_id: {_eq: 1}}) {
            game_session_id
            game {
              name
            }
            status {
              name
            }
            created_at
          }
        }
      `
    }).subscribe((result: any) => {
      this.sessions = result?.data?.game_session;
    });
  }

  ngOnInit() {}
}
