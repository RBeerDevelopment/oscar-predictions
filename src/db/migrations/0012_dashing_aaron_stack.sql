CREATE TABLE `feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`feedback` text NOT NULL,
	`email` text,
	`updated_at` integer NOT NULL
);
