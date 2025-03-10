CREATE TABLE `user_plans` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`plan_id` integer NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`compras` integer NOT NULL
);
