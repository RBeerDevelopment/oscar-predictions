import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	nominees: {
		nominations: r.many.nominations({
			from: r.nominees.id,
			to: r.nominations.nomineeId,
		}),
		secondaryNominations: r.many.nominations({
			from: r.nominees.id,
			to: r.nominations.secondaryNomineeId,
		}),
	},
	categories: {
		nominations: r.many.nominations({
			from: r.categories.id,
			to: r.nominations.categoryId,
		}),
		votes: r.many.votes({
			from: r.categories.id,
			to: r.votes.categoryId,
		}),
	},
	academyAwards: {
		nominations: r.many.nominations({
			from: r.academyAwards.id,
			to: r.nominations.acdademyAwardsId,
		}),
	},
	nominations: {
		nominee: r.one.nominees({
			from: r.nominations.nomineeId,
			to: r.nominees.id,
		}),
		secondaryNominee: r.one.nominees({
			from: r.nominations.secondaryNomineeId,
			to: r.nominees.id,
		}),
		category: r.one.categories({
			from: r.nominations.categoryId,
			to: r.categories.id,
		}),
		academyAward: r.one.academyAwards({
			from: r.nominations.acdademyAwardsId,
			to: r.academyAwards.id,
		}),
		votes: r.many.votes({
			from: r.nominations.id,
			to: r.votes.nominationId,
		}),
	},
	votes: {
		nomination: r.one.nominations({
			from: r.votes.nominationId,
			to: r.nominations.id,
		}),
		category: r.one.categories({
			from: r.votes.categoryId,
			to: r.categories.id,
		}),
	},
}))