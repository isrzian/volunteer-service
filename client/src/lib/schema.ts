import { z } from "zod";

export const applicationSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  isDone: z.boolean(),
  status: z.string(),
  applicant: z
    .object({
      surname: z.string(),
      name: z.string(),
    })
    .nullable(),
  operator: z
    .object({
      name: z.string(),
    })
    .nullable(),
});

export type ApplicationType = z.infer<typeof applicationSchema>;
