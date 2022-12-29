import {
  Action,
  Actions,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { debounceTime, from, map, mergeMap, tap } from 'rxjs';
import { Event, Game } from '../interfaces';
import { EventActions } from './event.actions';
import { insertItem, patch } from '@ngxs/store/operators';
import { handleSingleResponse } from '../error_handling';
import { iif } from '@ngxs/store/operators';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

export interface EventStateModel {
  events: Event[];
}

@State<EventStateModel>({
  name: 'event',
  defaults: {
    events: [],
  },
})
@Injectable()
export class EventState implements NgxsOnInit {
  private supabase: SupabaseClient;

  constructor(private readonly actions$: Actions) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  ngxsOnInit(): void {}

  @Selector()
  static events(state: EventStateModel): Event[] {
    return state.events;
  }

  @Selector([EventState.events])
  static current(events: Event[]): Event | undefined {
    return events.find((e) => e.current);
  }

  @Selector([EventState.current])
  static currentLocation(event: Event | undefined): string {
    return event?.location || 'at some unspecified location';
  }

  @Action(EventActions.GetAll)
  getAllEvents({ setState }: StateContext<EventStateModel>) {
    const query = this.supabase.from<Event>('event').select();
    return from(query).pipe(
      map((resp) => {
        if (resp.error) {
          alert(resp.error.message);
        }
        return resp?.data || [];
      }),
      tap((events: Event[]) => setState(patch({ events })))
    );
  }

  @Action(EventActions.Current.Set)
  setCurrent(
    { dispatch }: StateContext<EventStateModel>,
    { id }: EventActions.Current.Set
  ) {
    const queryOne = this.supabase
      .from<Event>('event')
      .update({ current: false });
    const queryTwo = this.supabase
      .from<Event>('event')
      .update({ current: true })
      .match({ event_id: id });
    return from(queryOne).pipe(
      mergeMap(() => from(queryTwo)),
      mergeMap(() => dispatch(new EventActions.GetAll()))
    );
  }
}
