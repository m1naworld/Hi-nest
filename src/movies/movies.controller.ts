import { Controller, Delete, Get, Param, Patch, Post, Body, Query} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
// express.js에서 처럼 수동으로 import 하는 건 nestJS에서 기본적으로 쓰는 방법이 아님
// nestJS는 요청을 기본으로 함.
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query('year') seachingYear: string){
        return `We are searching for a movie made after: ${seachingYear}`
    }

    @Get(':id')
    getOne(@Param('id') movieId: number) : Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.moviesService.create(movieData)
        
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId)
    }
    
    // Put 모든 리소스 update <=> Patch 리소스 일부분만 업데이트 

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData)
    }

    
}