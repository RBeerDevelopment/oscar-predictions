ALTER TABLE nominees_to_categories ADD `is_winner` integer;--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `nominees_tmdb_id_unique` ON `nominees` (`tmdb_id`);--> statement-breakpoint
ALTER TABLE `nominees` DROP COLUMN `description`;