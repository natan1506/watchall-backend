import axios from "axios";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface LoginBody {
  dns: string;
  username: string;
  password: string;
}

export async function userRoutes(app: FastifyInstance) {
  app.post('/login', async(req: FastifyRequest<{ Body: LoginBody }>, res: FastifyReply) => {
    const {dns, username, password} = req.body
    console.log(dns, username, password)
    const url = `${dns}/player_api.php?username=${username}&password=${password}&action=live&stream_id=`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error('Erro ao buscar detalhes do usuario:', err);
      return {err, status: 400};
    }
  })
}