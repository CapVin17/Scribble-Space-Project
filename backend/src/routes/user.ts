import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { verify,sign,decode } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signininput, signupinput, signupInput } from "@capvin17/medium-common";
import { signinInput } from "@capvin17/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const secret = c.env.JWT_SECRET;
  const { success } = signupinput.safeParse(body);

  if(!success)
  {
    return c.json({
        message : "Invalid credentials"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });


    const token = await sign({id : user.id}, secret);

    return c.json(
      {
        message: "Your data was sent successfully",
        token: token,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "An error occurred Try Again!!",
      },
      403
    );
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const secret = c.env.JWT_SECRET;

  const {success} = signininput.safeParse(body);

  if(!success) {
    return c.json({
        message: "Invalid signin credentials"
  })
  }

  const task = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!task) {
    return c.json(
      {
        message: "Invalid Email or Password",
      },
      403
    );
  }

  const token = await sign({ id: task.id }, secret);
  return c.json({ token });
});