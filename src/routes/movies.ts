import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod";

interface Movie {
  stream_id: number
  name: string
  stream_type: string
  category_id: number
  video: string
}

export async function moviesRoutes(app: FastifyInstance) {
  app.post('/movie-categories', async(req: FastifyRequest, res: FastifyReply) => {
    try {
      const createAllCategoriesSchema = z.object({
        dns: z.string(),
        username: z.string(),
        password: z.string()
      })
  
      const {dns, username, password} = createAllCategoriesSchema.parse(req.body)
  
      const url = `${dns}/player_api.php?username=${username}&password=${password}&action=get_vod_categories`
      const res = await axios.get(url)

      return res.data
    } catch (err) {
        console.error(err);
    }
   
  })

  app.post('/movies-category', async(req: FastifyRequest, res: FastifyReply) => {
    try {
      const createCategorySchema = z.object({
        dns: z.string(),
        username: z.string(),
        password: z.string(),
        categoryId: z.string()
      })
  
  
      const {dns, username, password, categoryId} = createCategorySchema.parse(req.body)
  
      const url = `${dns}/player_api.php?username=${username}&password=${password}&action=get_vod_streams&category_id=${categoryId}`;
      const res = await axios.get(url)

      return res.data
    } catch (err) {
        console.error(err);
    }
  })
  
  app.post('/search-movie', async(req: FastifyRequest, res: FastifyReply) => {
    try {
      const createCategorySchema = z.object({
        dns: z.string(),
        username: z.string(),
        password: z.string(),
        query: z.string()
      })
  
      const {dns, username, password, query} = createCategorySchema.parse(req.body)
  
      const url = `${dns}/player_api.php?username=${username}&password=${password}&action=get_vod_streams`;
      const res = await axios.get(url)

      const movies = res.data;
    
      // Filtrando localmente os filmes pelo título
      const filteredMovies = movies.filter((movie: Movie) => 
        movie.name.toLowerCase().includes(query.toLowerCase())
      );
    

      return filteredMovies
    } catch (err) {
        console.error(err);
    }
  })
}