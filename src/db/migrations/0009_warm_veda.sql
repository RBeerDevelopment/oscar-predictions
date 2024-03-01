CREATE TABLE `votes` (
	`user_id` integer NOT NULL,
	`nomination_id` integer NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`nomination_id`, `user_id`)
);
