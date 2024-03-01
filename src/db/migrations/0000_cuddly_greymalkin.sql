CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `nominees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text,
	`tmdb_id` text
);
--> statement-breakpoint
CREATE TABLE `nominees_to_categories` (
	`nominee_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`description` text,
	PRIMARY KEY(`category_id`, `nominee_id`),
	FOREIGN KEY (`nominee_id`) REFERENCES `nominees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
