import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxStarRatingModule} from 'ngx-star-rating';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {LogoComponent} from './components/ui/logo/logo.component';
import {MatIconModule} from '@angular/material/icon';
import {DiscoveryComponent} from './pages/discovery/discovery.component';
import {TrendingComponent} from './pages/trending/trending.component';
import {FreshComponent} from './pages/fresh/fresh.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {MovieCardComponent} from './components/ui/movie-card/movie-card.component';
import {MatCardModule} from '@angular/material/card';
import {MovieComponent} from './pages/movie/movie.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {RoundRatingPipe} from './pipes/round.rating.pipe';
import {GenreComponent} from './pages/genre/genre.component';
import {AuthInterceptor} from './inteceptors/auth.interceptor';
import {SliderComponent} from './components/ui/slider/slider.component';
import {GenresListPipe} from './pipes/genres.list.pipe';
import {VideoPlayerComponent} from './pages/movie/video-player/video-player.component';
import {BannerComponent} from './pages/movie/banner/banner.component';
import {FavoriteButtonComponent} from './components/ui/favorite-button/favorite-button.component';
import {CommentComponent} from './pages/movie/comment/comment.component';
import {RatingComponent} from './pages/movie/rating/rating.component';
import {ActorComponent} from './pages/actor/actor.component';
import {NgOptimizedImage} from '@angular/common';
import {FavoriteComponent} from './pages/favorite/favorite.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AdminNavbarComponent} from './components/admin/admin-navbar/admin-navbar.component';
import {StatisticsComponent} from './pages/admin/statistics/statistics.component';
import {UsersComponent} from './pages/admin/users/users.component';
import {ActorsComponent} from './pages/admin/actors/actors.component';
import {GenresComponent} from './pages/admin/genres/genres.component';
import {MoviesComponent} from './pages/admin/movies/movies.component';
import {ConvertMongoDatepipe} from './pipes/convertMongoDatepipe';
import {UserEditComponent} from './pages/admin/edit/user-edit/user-edit.component';
import {MovieEditComponent} from './pages/admin/edit/movie-edit/movie-edit.component';
import {MovieCreateComponent} from './pages/admin/create/movie-create/movie-create.component';
import {MatSelectModule} from '@angular/material/select';
import {ActorCreateComponent} from './pages/admin/create/actor-create/actor-create.component';
import {ActorEditComponent} from './pages/admin/edit/actor-edit/actor-edit.component';
import {GenreCreateComponent} from './pages/admin/create/genre-create/genre-create.component';
import {GenreEditComponent} from './pages/admin/edit/genre-edit/genre-edit.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LogoComponent,
    DiscoveryComponent,
    TrendingComponent,
    FreshComponent,
    MovieCardComponent,
    MovieComponent,
    NotFoundComponent,
    RoundRatingPipe,
    GenreComponent,
    SliderComponent,
    GenresListPipe,
    VideoPlayerComponent,
    BannerComponent,
    FavoriteButtonComponent,
    CommentComponent,
    RatingComponent,
    ActorComponent,
    FavoriteComponent,
    ProfileComponent,
    AdminNavbarComponent,
    StatisticsComponent,
    UsersComponent,
    ActorsComponent,
    GenresComponent,
    MoviesComponent,
    ConvertMongoDatepipe,
    UserEditComponent,
    MovieEditComponent,
    MovieCreateComponent,
    ActorCreateComponent,
    ActorEditComponent,
    GenreCreateComponent,
    GenreEditComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatCardModule,
    NgxStarRatingModule,
    NgOptimizedImage,
    MatSelectModule,
    NgxPaginationModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
