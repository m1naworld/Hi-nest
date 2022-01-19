import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id) ;
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie ; 
        // parseInt(id) 또는 + id >>> string -> number로 
    } 

    deleteOne(id: number): Movie[]{
        this.getOne(id); 
        const newMovies = this.movies.filter(movie => movie.id !== id) ;
        this.movies = newMovies
        return this.movies
    }

    create(movieData:CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id: number, updateData: UpdateMovieDto){
        const movie = this.getOne(id) ;
        this.deleteOne(id);
        this.movies.push({
            ...movie,
            ...updateData
        })
    }
}
