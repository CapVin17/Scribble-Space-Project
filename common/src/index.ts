import z from "zod";

// 1
export const signupinput = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
});

export type signupInput = z.infer<typeof signupinput>;

//2
export const signininput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type signinInput = z.infer<typeof signininput>;

// 3
export const bloginput = z.object({
  title: z.string(),
  content: z.string().max(1000000),
});

export type blogInput = z.infer<typeof bloginput>;

//4
export const updatebloginput = z.object({
  title: z.string(),
  content: z.string().max(1000000),
  id: z.string(),
});

export type updateblogInput = z.infer<typeof updatebloginput>;
