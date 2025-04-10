import { z } from "zod";

export const reviewSchemaValidation = z
  .object({
    productRating: z.number({ required_error: "product rating is required" }).int().gte(0).lte(5),
    sellerRating: z.number({ required_error: "seller rating is required" }).int().gte(0).lte(5),
    feedbackTitle: z
      .string()
      .trim()
      .min(3, "Feedback Title must have at least 3 characters")
      .optional(),
    feedbackComment: z
      .string()
      .trim()
      .min(10, "Feedback comment must have at least 10 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    const hasTitle = !!data.feedbackTitle;
    const hasComment = !!data.feedbackComment;

    if (hasTitle && !hasComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Feedback comment is required when feedback title is provided",
        path: ["feedbackComment"],
      });
    }

    if (hasComment && !hasTitle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Feedback title is required when feedback comment is provided",
        path: ["feedbackTitle"],
      });
    }
  });


  export const updateReviewSchemaValidation = z
  .object({
    productRating: z.optional(z.number().int().gte(0).lte(5)),
    sellerRating: z.optional(z.number().int().gte(0).lte(5)),
    feedbackTitle: z
      .string()
      .trim()
      .min(3, "Feedback Title must have at least 3 characters")
      .optional(),
    feedbackComment: z
      .string()
      .trim()
      .min(10, "Feedback comment must have at least 10 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    const hasTitle = !!data.feedbackTitle;
    const hasComment = !!data.feedbackComment;

    if (hasTitle && !hasComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Feedback comment is required when feedback title is provided",
        path: ["feedbackComment"],
      });
    }

    if (hasComment && !hasTitle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Feedback title is required when feedback comment is provided",
        path: ["feedbackTitle"],
      });
    }
  });
