ALTER TABLE `nominees` RENAME COLUMN `type` TO `name`;--> statement-breakpoint
ALTER TABLE nominees ADD `description` text;