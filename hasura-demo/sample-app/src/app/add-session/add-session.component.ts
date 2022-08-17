import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const addSessionMutation = gql`
  mutation createSession($eventId: Int!, $gameId: Int!, $statusId: Int!) {
    insert_game_session(objects: {event_id: $eventId, game_id: $gameId, status_id: $statusId}) {
      returning {
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
  }
`;

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html'
})
export class AddSessionComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  addSession() {
    this.apollo.mutate({
      mutation: addSessionMutation,
      variables: {
        gameId: Math.floor(Math.random() * 3) + 1,
        eventId: 1,
        statusId: 1,
      }
    }).subscribe(({data}) => {
      console.log("Added ", data)
    });
  }

}
