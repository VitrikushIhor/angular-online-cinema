import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {FreshComponent} from './pages/fresh/fresh.component';
import {TrendingComponent} from './pages/trending/trending.component';
import {DiscoveryComponent} from './pages/discovery/discovery.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {GenreComponent} from './pages/genre/genre.component';
import {GenreResolver} from './resolvers/genre.resolver';
import {MovieComponent} from './pages/movie/movie.component';
import {MovieResolver} from './resolvers/movie.resolver';
import {RedirectGuard} from './guards/redirect.guard';
import {ActorComponent} from './pages/actor/actor.component';
import {ActorResolver} from './resolvers/actor.resolver';
import {FavoriteComponent} from './pages/favorite/favorite.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {StatisticsComponent} from './pages/admin/statistics/statistics.component';
import {AdminGuard} from './guards/admin.guard';
import {UsersComponent} from './pages/admin/users/users.component';
import {MoviesComponent} from './pages/admin/movies/movies.component';
import {GenresComponent} from './pages/admin/genres/genres.component';
import {ActorsComponent} from './pages/admin/actors/actors.component';
import {UserEditComponent} from './pages/admin/edit/user-edit/user-edit.component';
import {UserEditResolver} from './resolvers/user-edit.resolver';
import {MovieEditComponent} from './pages/admin/edit/movie-edit/movie-edit.component';
import {MovieEditResolver} from './resolvers/movie-edit.resolver';
import {MovieCreateComponent} from './pages/admin/create/movie-create/movie-create.component';
import {MovieCreateResolver} from './resolvers/movie-create.resolver';
import {ActorCreateComponent} from './pages/admin/create/actor-create/actor-create.component';
import {ActorCreateResolver} from './resolvers/actor-create.resolver';
import {ActorEditComponent} from './pages/admin/edit/actor-edit/actor-edit.component';
import {ActorEditResolver} from './resolvers/actor-edit.resolver';
import {GenreCreateComponent} from './pages/admin/create/genre-create/genre-create.component';
import {GenreCreateResolver} from './resolvers/genre-create.resolver';
import {GenreEditComponent} from './pages/admin/edit/genre-edit/genre-edit.component';
import {GenreEditResolver} from './resolvers/genre-edit.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'fresh', component: FreshComponent},
  {path: 'trending', component: TrendingComponent},
  {path: 'discovery', component: DiscoveryComponent},
  {path: 'favorites', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'movie/:slug', component: MovieComponent, canActivate: [RedirectGuard], resolve: {data: MovieResolver}},
  {path: 'genre/:slug', component: GenreComponent, resolve: {data: GenreResolver}},
  {path: 'actor/:slug', component: ActorComponent, resolve: {data: ActorResolver}},
  {path: 'admin/statistics', component: StatisticsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/movies', component: MoviesComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/genres', component: GenresComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/actors', component: ActorsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/statistics', component: StatisticsComponent, canActivate: [AuthGuard, AdminGuard]},
  // create
  {
    path: 'admin/create/movie/:id',
    component: MovieCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {data: MovieCreateResolver},
  },
  {
    path: 'admin/create/actor/:id',
    component: ActorCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {data: ActorCreateResolver},
  },
  {
    path: 'admin/create/genre/:id',
    component: GenreCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {data: GenreCreateResolver},
  },
  // edit
  {
    path: 'admin/edit/user/:id',
    component: UserEditComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {data: UserEditResolver},
  },
  {
    path: 'admin/edit/movie/:id',
    component: MovieEditComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {data: MovieEditResolver},
  },
  {
    path: 'admin/edit/actor/:id',
    component: ActorEditComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {data: ActorEditResolver},
  },
  {
    path: 'admin/edit/genre/:id',
    component: GenreEditComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {data: GenreEditResolver},
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
