import { log } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';
import payload from 'payload';

const app = express()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  log("Calling getProducts")
  try {

    const posts = await payload.find({
      collection: 'products',
      // Add any query parameters as needed
      // limit: 10,
      // where: { status: { equals: 'published' } },
    });
    log("fetched Posts: ", posts)

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Unable to fetch posts' });
  }
}

function express() {
    throw new Error('Function not implemented.');
}
