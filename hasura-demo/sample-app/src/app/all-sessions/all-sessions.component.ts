import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

const subscription = gql`
  subscription openSessions {
    game_session(order_by: {created_at: asc}) {
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

const closeSessionMutation = gql`mutation closeSession($gameSessionId:Int!) {
  update_game_session_by_pk(pk_columns: {game_session_id: $gameSessionId}, _set: {status_id: 2}) {
    game_session_id
    event {
      name
    }
    game {
      name
    }
    status {
      name
    }
  }
}
`

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html'
})
export class AllSessionsComponent implements OnInit {
  title = 'sample-app';
  sessions: any[] = [];

  constructor(private apollo: Apollo) {
    apollo.subscribe({
      query: subscription
    }).subscribe((result: any) => {
      this.sessions = result?.data?.game_session;
    });
  }

  closeSession(gameSessionId: number) {
    this.apollo.mutate({
      mutation: closeSessionMutation,
      variables: {
        gameSessionId
      }
    }).subscribe(({data}) => {
      console.log("Closed ", data)
    });
  }

  ngOnInit() {}
}
