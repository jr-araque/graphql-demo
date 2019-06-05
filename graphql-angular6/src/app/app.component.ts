import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'graphql-angular';
  queryRef: QueryRef<any, any>;
  querySub: Subscription;
  results: any;
  errors: any;
  pokemonId = 17;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    if (this.querySub && this.querySub.unsubscribe) {
      this.querySub.unsubscribe();
      this.querySub = undefined;
    }
  }

  search() {
    this.fetchData();
  }

  fetchData() {
    const singleFetch = gql`
      query($id: ID!) {
        pokemon(id: $id) {
          name
          base_experience
        }
      }
    `;
    const allPokemon = gql`
      {
        pokemonList {
          name
          base_experience
        }
      }
    `;
    this.queryRef = this.apollo.watchQuery({
      query: allPokemon,
      variables: { id: this.pokemonId }
    });

    this.querySub = this.queryRef.valueChanges.subscribe(results => {
      if (results.errors) {
        this.errors = results.errors;
        throw new Error('Error');
      }

      if (results.data) {
        this.errors = undefined;
        this.results = results.data as any;
      }
    });
  }
}
