import { z } from "zod"

const validateSchema = z.object({
	ownerName: z.string().min(1, "Owner Name must be at least 1 character").max(30, "Owner Name must be at most 30 characters"),
	repositoryName: z.string().min(1, "Repository Name must be at least 1 character").max(20, "Name must be at most 20 characters"),
	rating: z.string().min(1, "Rating must be at least 1 character").max(5, "Rating must be at most 5 characters"),
	text: z.string().min(1, "Text must be at least 1 character").max(100, "Text must be at most 100 characters"),
})

export default validateSchema
