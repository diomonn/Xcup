import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const Where = async (req: NextApiRequest, res: NextApiResponse) => {
  // const router=useRouter()
  const { id } = req.query
  if (req.query.id) {
    const data = await prisma.linkCardGather.findUnique({
      where: {
        id: id as string
      },
      include: {
        LinkCard: true,
        userTeaam: {
          select: {
            user: {
              select: {
                image: true,
                name: true,
                id: true
              }
            }
          },
        },

      }
    })
    res.status(200).json(data)
  } else {
    res.status(401).json({ 'ok': "请完善" })

  }

  // console.log(req);
  // res.status(200).json({'ok':req.find})

}
export default Where
