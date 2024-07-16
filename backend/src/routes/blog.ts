import { Hono } from "hono";
import { Prisma,PrismaClient } from "@prisma/client/edge";
import { verify, sign, decode } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { bloginput, updatebloginput } from "@capvin17/medium-common";


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
    const authRouter = c.req.header("Authorization") || "";
    const verifyingtoken = authRouter.split(" ")[0];

    const token = await verify(verifyingtoken,c.env.JWT_SECRET);

    if(token)
    {
        //@ts-ignore
        c.set("userId", token.id);
        await next();
    }

    else{
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }

});

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { success } = bloginput.safeParse(body);

    if(!success)
    {
        return c.json({
            message: "Invalid blog credentials"
        })
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });

    return c.json({
        id: blog.id
    })
});

blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { success } = updatebloginput.safeParse(body);

    if(!success)
    {
        return c.json({
            message: "Invalid update blog credentials"
        })
    }

    const blog = await prisma.post.update({
    where:
    {
        id: body.id,
    },
    data: {
        title: body.title,
        content: body.content,
    }
});

    return c.json({
        id: blog.id
    })
});

blogRouter.get("/bulk", async(c) => {
    //const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const allblogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        return c.json({
            allblogs,
        })
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Couldn't fetch all blogs check your credentials",
        })
    }
});


blogRouter.get("/:id", async (c) => {
    const id = await c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id,
            },
        })

        return c.json({
            blog,
        });
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Could not find blog check your credentials"
        })
    }
});


